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
const Queue = require("./peer/queue");
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

// let queue = new Queue();
let queue = [];
const rooms = {};
const sockets = {};

const getPeerForSocket = (client) => {
  if (!queue.list.length) {
    queue.enqueue(client);
    return {};
  } else {
    const peer = queue.dequeue();
    const room = `${client.customId}#${peer.customId}`;
    rooms[client.customId] = room;
    rooms[peer.customId] = room;
    peer.join(room);
    client.join(room);
    return { room, user: peer };
  }
};

io.on("connection", (client) => {
  client.on("store-user-id", ({ id }) => {
    client.customId = id;
    sockets[id] = client;
  });

  client.on("message", ({ message, sentBy, gender }) => {
    io.to(rooms[client.customId]).emit("message-recieved", {
      message,
      sentBy,
      gender,
    });
  });

  client.on("pair-to-room", () => {
    const { room, user } = getPeerForSocket(client);
    console.log(`>> PAIRING TO ROOM, ${room} ${user?.customId}`);
    if (room && user) {
      client.emit("paired-to-room", { room, user: user.customId });
      user.emit("paired-to-room", { user: user.customId, room });
    } else {
      client.emit("searching-for-pair");
    }
  });

  // client.on("skip", ({ room }) => {
  //   const peerIdArr = room.split("#");
  //   delete rooms[peerIdArr[0]];
  //   delete rooms[peerIdArr[1]];

  //   queue.enqueue(sockets[peerIdArr[1]]);
  //   queue.enqueue(sockets[peerIdArr[0]]);
  //   // queue.validateQueue(sockets);

  //   io.to(room).emit("peer-disconnected");
  //   sockets[peerIdArr[0]].leave(room);
  //   sockets[peerIdArr[1]].leave(room);
  // });
  client.on("skip", ({ room }) => {
    const peerIdArr = room.split("#");
    delete rooms[peerIdArr[0]];
    delete rooms[peerIdArr[1]];

    queue.unshift(sockets[peerIdArr[1]]);
    queue.unshift(sockets[peerIdArr[0]]);

    queue = queue.filter((s) => Object.keys(sockets).includes(s.customId));

    io.to(room).emit("peer-disconnected");
    sockets[peerIdArr[0]].leave(room);
    sockets[peerIdArr[1]].leave(room);
  });

  client.on("disconnect", (_) => {
    const room = rooms[client.customId];
    if (room) {
      // const peerIdArr = room.split("#");
      // const peerId =
      //   peerIdArr[0] === client.customId ? peerIdArr[1] : peerIdArr[0];

      // peerIdArr[0] === client.customId
      //   ? queue.enqueue(sockets[peerIdArr[1]])
      //   : queue.enqueue(sockets[peerIdArr[0]]);

      // queue.validateQueue(sockets);

      // io.to(room).emit("peer-disconnected");

      // delete rooms[peerIdArr[0]];
      // delete rooms[peerIdArr[1]];
      // delete sockets[client.customId];
      const peerIdArr = room.split("#");
      const peerId =
        peerIdArr[0] === client.customId ? peerIdArr[1] : peerIdArr[0];

      delete rooms[peerIdArr[0]];
      delete rooms[peerIdArr[1]];
      peerIdArr[0] === client.customId
        ? queue.unshift(sockets[peerIdArr[1]])
        : queue.unshift(sockets[peerIdArr[0]]);
      queue = queue.filter((s) => Object.keys(sockets).includes(s.customId));

      io.to(room).emit("peer-disconnected");
      sockets[peerIdArr[0]].leave(room);
      sockets[peerIdArr[1]].leave(room);

      delete sockets[client.customId];
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
