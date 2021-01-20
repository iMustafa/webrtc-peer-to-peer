const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const ReportsSchema = new Schema({}, { timestamps: true });

module.exports = mongoose.model("Reports", ReportsSchema);
