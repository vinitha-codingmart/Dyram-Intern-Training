"use strict";
module.exports = (sequelize, DataTypes) => {
  const Calls = sequelize.define(
    "Calls",
    {
      channel: DataTypes.STRING,
      duration: DataTypes.STRING,
      userCount: DataTypes.STRING,
      sendBytes: DataTypes.STRING,
      recvBytes: DataTypes.STRING,
      sendBitrate: DataTypes.STRING,
      recvBitrate: DataTypes.STRING
    },
    {}
  );
  Calls.associate = function(models) {
    // associations can be defined here
  };
  return Calls;
};
