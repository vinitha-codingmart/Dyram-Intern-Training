'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionsTable = sequelize.define('QuestionsTable', {
    question: DataTypes.TEXT,
    questionType: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option3: DataTypes.STRING,
    option4: DataTypes.STRING,
    correctAnswer: DataTypes.INTEGER,
    messageForCorrectAnswer: DataTypes.TEXT,
    messageForIncorrectAnswer: DataTypes.TEXT
  }, {});
  QuestionsTable.associate = function(models) {
    // associations can be defined here
  };
  return QuestionsTable;
};