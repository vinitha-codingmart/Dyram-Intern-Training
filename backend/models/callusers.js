"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallUsers = sequelize.define(
    "CallUsers",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      validity: DataTypes.INTEGER
    },
    {}
  );
  CallUsers.associate = function(models) {
    CallUsers.hasMany(models.CallsLog);
  };
  return CallUsers;
};
