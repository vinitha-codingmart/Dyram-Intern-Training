"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallUsers = sequelize.define(
    "CallUsers",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      validity: DataTypes.BIGINT
    },
    {}
  );
  CallUsers.associate = function(models) {
    CallUsers.hasMany(models.CallSubscribes);
    CallUsers.hasOne(models.CallPlans);
  };
  return CallUsers;
};
