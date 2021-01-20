const mongoose = require("mongoose");
const Reports = require("./reports");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const UserSchema = new Schema({
  ipAddress: String,
  socketId: String,
  isOnline: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },
  roomId: String,
  reports: [{ type: Types.ObjectId, ref: Reports }]
});

module.exports = mongoose.model("User", UserSchema);
