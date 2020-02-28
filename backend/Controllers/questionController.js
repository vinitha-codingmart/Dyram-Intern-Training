const model = require("../models");
const Question = model.QuestionsTable;

Questions = () => {};

Questions.getQuestions = async () => {
  let promise = await Question.findAll();
  return promise;
};

module.exports = Questions;
