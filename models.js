const mongoose = require("mongoose");

let clipDataSchema = mongoose.Schema({
  clipUrl: String,
  clipName: String,
  player: String,
  game: String,
});

let clipData = mongoose.model("clips", clipDataSchema, "clips");

module.exports.clipData = clipData;
