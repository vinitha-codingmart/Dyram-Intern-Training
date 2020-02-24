"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallsLog = sequelize.define(
    "CallsLog",
    {
      duration: DataTypes.INTEGER
    },
    {}
  );
  CallsLog.associate = function(models) {
    CallsLog.belongsTo(models.CallUsers);
  };
  return CallsLog;
};
