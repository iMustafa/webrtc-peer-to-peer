const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const MessagesSchema = new Schema(
  {
    email: String,
    body: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessagesSchema);
