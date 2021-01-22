const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const EmailsSchema = new Schema(
  {
    email: String,
    body: String,
    subject: String,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", EmailsSchema);
