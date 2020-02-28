"use strict";
module.exports = (sequelize, DataTypes) => {
  const QuestionUsers = sequelize.define(
    "QuestionUsers",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  QuestionUsers.associate = function(models) {
    QuestionUsers.hasMany(models.AnswerUsers);
  };
  return QuestionUsers;
};
