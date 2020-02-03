module.exports = app => {
  const passwordHash = require("password-hash");

  const Posts = require("../controllers/postController");
  const Users = require("../controllers/userController");

  app.get("/", (req, res) => {
    res.send("Hello there!");
  });

  app.post("/addPost", (req, res) => {
    console.log(req.body.post.title);
    Posts.addPosts(
      req.body.post.title,
      req.body.post.content,
      req.body.user.name.name
    );
  });

  app.post("/getPost", async (req, res) => {
    let promise = await Posts.getPosts(req.body.name);
    res.send(promise);
  });

  app.post("/getFollower", async (req, res) => {
    let promise = await Posts.getFollowers(req.body.name.name);
    res.send(promise);
  });

  app.post("/addUser", (req, res) => {
    Users.addUsers(
      req.body.user.name,
      passwordHash.generate(req.body.user.password),
      req.body.followers.followers
    );
  });

  app.post("/loginUser", async (req, res) => {
    let promise = await Users.loginUser(req.body.name, req.body.password);
    if (promise.validity) res.send(promise);
    else res.send();
  });

  app.get("/getUsers", async (req, res) => {
    let resp = await Users.getUsers();
    res.send(resp);
  });

  app.post("/getUser", async (req, res) => {
    let resp = await Users.getUserName(req.body.id);
    res.send(resp);
  });

  app.post("/addFollower", (req, res) => {
    Users.addFollower(req.body.followers);
  });
};
