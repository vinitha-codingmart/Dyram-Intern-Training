const mongoose = require("mongoose");

let posts = mongoose.Schema({
  title: String,
  content: String,
  name: String
});

module.exports = posts;
