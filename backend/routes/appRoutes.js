module.exports = app => {
  const passwordHash = require("password-hash");

  const Posts = require("../controllers/postController");
  const Users = require("../controllers/userController");

  app.get("/", (req, res) => {
    res.send("Hello there!");
  });

  app.post("/addPost", (req, res) => {
    Posts.addPosts(req.body.title, req.body.content);
  });

  app.get("/getPost", async (req, res) => {
    let promise = await Posts.getPosts();
    res.json(promise);
  });

  app.post("/addUser", (req, res) => {
    Users.addUsers(req.body.name, passwordHash.generate(req.body.password));
  });

  app.post("/loginUser", async (req, res) => {
    let promise = await Users.loginUser(req.body.name, req.body.password);
    if (promise.validity) res.send(promise);
    else res.send();
  });

  app.get("/getUsers", async (req, res) => {
    let resp = await Users.getUser();
    res.send(resp);
  });
};
