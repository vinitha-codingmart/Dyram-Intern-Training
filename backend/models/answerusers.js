"use strict";
module.exports = (sequelize, DataTypes) => {
  const AnswerUsers = sequelize.define(
    "AnswerUsers",
    {
      UserId: DataTypes.INTEGER,
      score: DataTypes.INTEGER
    },
    {}
  );
  AnswerUsers.associate = function(models) {
    AnswerUsers.belongsTo(models.QuestionUsers);
  };
  return AnswerUsers;
};
