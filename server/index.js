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
const Report = require("./models/reports");
const moment = require("moment");
const geoip = require("geoip-lite");

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

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
);

let queue = [];
const rooms = {};

const getPeerForSocket = (client) => {
  if (queue.length > 1) {
    const peer = queue[0].id == client.id ? queue.pop() : queue.shift();
    const room = `${client.id}#${peer.id}`;
    rooms[client.id] = room;
    rooms[peer.id] = room;
    peer.join(room);
    client.join(room);
    return { room, user: peer };
  } else {
    return {};
  }
};

io.on("connection", async (client) => {
  const ipAddress = client.handshake.headers["x-forwarded-for"];
  const geo = geoip.lookup(ipAddress);

  client.isPaired = false;
  client.isActive = false;
  client.reportCounter = 0;
  client.geo = geo;

  const findUser = await User.findOne({ ipAddress });
  if (findUser) {
    console.log('>> FOUNT USER', ipAddress);
    client.emit("connection-rebound", {
      clientId: client.id,
      ...findUser,
      geo: client.geo,
    });
  } else {
    console.log('>> CREATING NEW USER', ipAddress);
    const createdUser = await User.create({ ipAddress, socketId: client.id });
    client.emit("connection-rebound", {
      clientId: client.id,
      ...createdUser,
      geo: client.geo,
    });
  }

  client.on("message", ({ message, sentBy, gender }) => {
    io.to(rooms[client.id]).emit("message-recieved", {
      message,
      sentBy,
      gender,
    });
  });

  client.on("pair-to-room", () => {
    client.isActive = true;
    queue = Array.from(io.sockets.sockets.values()).filter(
      (s) => s.isActive && !s.isPaired && !s.isBanned
    );
    const { room, user } = getPeerForSocket(client);

    if (room && user) {
      user.isPaired = true;
      client.isPaired = true;
      queue = Array.from(io.sockets.sockets.values()).filter(
        (s) => s.isActive && !s.isPaired
      );
      client.emit("paired-to-room", { room, geo: user.geo });
      user.emit("paired-to-room", { room, geo: client.geo });
    }
  });

  client.on("skip", async ({ room, isReport }) => {
    const peerIdArr = room.split("#");
    const peerId = peerIdArr[0] == client.id ? peerIdArr[1] : peerIdArr[0];
    delete rooms[peerIdArr[0]];
    delete rooms[peerIdArr[1]];

    io.sockets.sockets.get(peerIdArr[0]).isPaired = false;
    io.sockets.sockets.get(peerIdArr[1]).isPaired = false;

    if (isReport) {
      console.log('>> isReport', true);

      const report = await Report.create({});
      const { _id } = report;
      const user = await User.findOneAndUpdate(
        { ipAddress: io.sockets.sockets.get(peerId).handshake.headers["x-forwarded-for"] },
        { $push: { reports: _id } },
        { new: true }
      ).populate("reports");

      const { reports } = user;
      console.log('reports.length', reports);
      const now = moment();
      const last15MinutesReports = reports.filter(
        ({ createdAt }) => now.diff(moment(createdAt), "minutes") <= 15
      );

      console.log('last15MinutesReports.length', last15MinutesReports.length)
      if (last15MinutesReports.length >= 3) {
        await User.findOneAndUpdate({ ipAddress: io.sockets.sockets.get(peerId).handshake.headers["x-forwarded-for"] }, { isBanned: true });
        io.sockets.sockets.get(peerId).isBanned = true;
        io.sockets.sockets.get(peerId).emit("user-banned");
      }
    }

    queue = Array.from(io.sockets.sockets.values()).filter(
      (s) => s.isActive && !s.isPaired && !s.isBanned
    );

    io.to(room).emit("peer-disconnected");
    io.sockets.sockets.get(peerIdArr[0])?.leave(room);
    io.sockets.sockets.get(peerIdArr[1])?.leave(room);
  });

  client.on("exit", ({ room }) => {
    const peerIdArr = room.split("#");
    const peerId = peerIdArr[0] == client.id ? peerIdArr[1] : peerIdArr[0];

    delete rooms[peerIdArr[0]];
    delete rooms[peerIdArr[1]];

    io.sockets.sockets.get(client.id).isPaired = false;
    io.sockets.sockets.get(client.id).isActive = false;

    io.sockets.sockets.get(peerId).isPaired = false;

    queue = Array.from(io.sockets.sockets.values()).filter(
      (s) => s.isActive && !s.isPaired && !s.isBanned
    );

    io.sockets.sockets.get(peerId).emit("peer-disconnected");
    io.sockets.sockets.get(client.id).emit("calls-disconnected");

    io.sockets.sockets.get(client.id)?.leave(room);
    io.sockets.sockets.get(peerId)?.leave(room);
  });

  client.on("disconnect", (_) => {
    queue = Array.from(io.sockets.sockets.values()).filter(
      (s) => s.isActive && !s.isPaired
    );

    const room = rooms[client.id];
    if (room) {
      const peerIdArr = room.split("#");
      const peerId = peerIdArr[0] == client.id ? peerIdArr[1] : peerIdArr[0];
      io.sockets.sockets.get(peerId).isPaired = false;
      io.to(room).emit("peer-disconnected");
      io.sockets.sockets.get(peerId).leave(room);
      delete rooms[peerIdArr[0]];
      delete rooms[peerIdArr[1]];
    }
  });
});

server.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
    exclusive: true,
  },
  async (_) => {
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
  }
);
