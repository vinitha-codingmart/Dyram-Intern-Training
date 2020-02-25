"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CallSubscribes", "UserId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "CallUsers",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CallSubscribes", "UserId");
  }
};
