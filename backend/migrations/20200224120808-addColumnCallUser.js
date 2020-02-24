"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("CallsLogs", "UserId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "CallUsers",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("CallsLogs", "UserId");
  }
};
