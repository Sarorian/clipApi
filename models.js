const mongoose = require("mongoose");

let clipDataSchema = mongoose.Schema({
  clipUrl: String,
  name: String,
  game: String,
});

let clipData = mongoose.model("clips", clipDataSchema, "clips");

module.exports.clipData = clipData;
