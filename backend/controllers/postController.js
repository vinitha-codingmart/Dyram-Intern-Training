const mongoose = require("mongoose");
const posts = require("../models/posts");
const users = require("../models/users");

Posts = () => {};

Posts.getPosts = async namez => {
  let postsModel = mongoose.model("Posts", posts);
  let promise = await postsModel.find({ name: namez });
  return promise;
};

Posts.addPosts = (title, content, user) => {
  let postsModel = mongoose.model("Posts", posts);

  let newPost = new postsModel();
  newPost.title = title;
  newPost.content = content;
  newPost.name = user;

  newPost.save((err, save) => {
    if (save) console.log("Data Added");
    else console.log(err);
  });
};

Posts.getFollowers = async namez => {
  let usersModel = mongoose.model("Users", users);
  let following = await usersModel.find({ name: namez });
  let followingList = await following[0].following;
  return followingList;
};

module.exports = Posts;
