"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Calls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channel: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      userCount: {
        type: Sequelize.STRING
      },
      sendBytes: {
        type: Sequelize.STRING
      },
      recvBytes: {
        type: Sequelize.STRING
      },
      sendBitrate: {
        type: Sequelize.STRING
      },
      recvBitrate: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Calls");
  }
};
