const mongoose = require("mongoose");
const posts = require("../models/posts");

Posts = () => {};

Posts.getPosts = async () => {
  let postsModel = mongoose.model("Posts", posts);
  let promise = await postsModel.find({});
  return promise;
};

Posts.addPosts = (title, content) => {
  let postsModel = mongoose.model("Posts", posts);

  let newPost = new postsModel();
  newPost.title = title;
  newPost.content = content;

  newPost.save((err, save) => {
    if (save) console.log("Data Added");
    else console.log(err);
  });
};

module.exports = Posts;
