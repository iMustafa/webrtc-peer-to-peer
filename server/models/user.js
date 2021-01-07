const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  ip: String,
  socketId: String,
  peerId: String,
  isOnline: Boolean,
  isBanned: Boolean,
  roomId: String
});

module.exports = mongoose.model('User', UserSchema);