const { PeerServer } = require("peer");
const peerServer = PeerServer({ path: "/", debug: true, port: 3001 });

peerServer.on("connection", (client) => {
  console.log(">> Client Connected to peer server", client.getId());
});

peerServer.on('disconnect', _ => {
  console.log('>> DISCONNECTED')
})

peerServer.on("error", (e) => {
  console.log(e);
});

peerServer.listen((_) => {
  console.log(">> Peer Server Running");
});

module.exports = peerServer;
