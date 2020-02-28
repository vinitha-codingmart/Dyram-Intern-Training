const model = require("../models");
const Score = model.AnswerUsers;

Scores = () => {};

Scores.addUser = async (id, score) => {
  let promise = await Score.create({ UserId: id, score });
  return promise;
};

module.exports = Scores;
