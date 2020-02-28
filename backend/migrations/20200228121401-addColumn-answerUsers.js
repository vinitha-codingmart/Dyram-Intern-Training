"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("AnswerUsers", "UserId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "QuestionUsers",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("AnswerUsers", "UserId");
  }
};
