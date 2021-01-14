const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const routes = require("./routes");
const peerServer = require("./peer");

const User = require("./models/user");

app.use(cors());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use("/api", routes);

let queue = [];
const rooms = {};
const sockets = {};

const getPeerForSocket = (socket) => {
  if (!queue.length) {
    queue.push(socket);
    return {};
  } else {
    const peer = queue.pop();
    if (peer) {
      const room = `${socket.id}#${peer.id}`;
      rooms[socket.id] = room;
      rooms[peer.id] = room;
      peer.join(room);
      socket.join(room);
      return { room, user: peer };
    }
  }
  return {};
};

io.on("connection", (client) => {
  sockets[client.id] = client;
  client.emit("connection-rebound", client.id);

  client.on("message", ({ message, sentBy }) => {
    io.to(rooms[client.id]).emit("message-recieved", {message, sentBy});
    // client.emit("message-recieved", { message, sentBy });
  });

  client.on("pair-to-room", () => {
    const { room, user } = getPeerForSocket(client);
    if (room && user) {
      client.emit("paired-to-room", { room, user: user.id });
      user.emit("paired-to-room", { user: user.id, room });
    } else {
      client.emit("searching-for-pair");
    }
  });

  client.on("skip", ({ room }) => {
    const peerIdArr = room.split("#");
    delete rooms[peerIdArr[0]];
    delete rooms[peerIdArr[1]];

    queue.unshift(sockets[peerIdArr[1]]);
    queue.unshift(sockets[peerIdArr[0]]);

    queue = queue.filter((s) => Object.keys(sockets).includes(s));

    io.to(room).emit("peer-disconnected");
    sockets[peerIdArr[0]].leave(room);
    sockets[peerIdArr[1]].leave(room);
  });

  client.on("disconnect", (_) => {
    const room = rooms[client.id];
    if (room) {
      const peerIdArr = room.split("#");
      const peerId = peerIdArr[0] === client.id ? peerIdArr[1] : peerIdArr[0];
      delete rooms[peerIdArr[0]];
      delete rooms[peerIdArr[1]];
      sockets[peerIdArr[0]].leave(room);
      sockets[peerIdArr[1]].leave(room);

      peerIdArr[0] === client.id
        ? queue.unshift(sockets[peerIdArr[1]])
        : queue.unshift(sockets[peerIdArr[0]]);

      delete sockets[client.id];
      queue = queue.filter((s) => Object.keys(sockets).includes(s));

      io.to(room).emit("peer-disconnected");
    }
  });
});

server.listen(process.env.PORT || 3000, async (_) => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:12321Aa@cluster0.oekad.mongodb.net/random-chat?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
  } catch (e) {
    process.exit(0);
  }
});
