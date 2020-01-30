const mongoose = require("mongoose");

let users = mongoose.Schema({
  name: String,
  password: String,
  posts: [],
  following: []
});

module.exports = users;
