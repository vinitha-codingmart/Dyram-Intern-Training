const mongoose = require("mongoose");

let posts = mongoose.Schema({
  title: String,
  content: String
});

module.exports = posts;
