module.exports = app => {
  const jwt = require("jsonwebtoken");
  const key = require("../config/keys.json");

  //Controllers
  const Users = require("../Controllers/userController");
  const Scores = require("../Controllers/scoreController");
  const Questions = require("../Controllers/questionController");

  //Routes
  app.get("/", (req, res) => {
    res.send("Working Fine!!");
  });

  app.post("/login", async (req, res) => {
    let resp = await Users.loginUser(req.body.name, req.body.pass);
    res.send(resp);
  });

  app.post("/signUp", async (req, res) => {
    let resp = await Users.addUser(req.body.name, req.body.pass);
    res.send(resp);
  });

  app.post("/quizSubmit", async (req, res) => {
    let resp = await Scores.addUser(
      jwt.verify(req.body.data.id, key.tokenKey).id,
      req.body.score
    );
    res.send(resp);
  });

  app.post("/getQuestions", async (req, res) => {
    let resp = await Questions.getQuestions();
    res.send(resp);
  });
};
