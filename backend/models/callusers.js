"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallUsers = sequelize.define(
    "CallUsers",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      validity: DataTypes.DATE,
      email: DataTypes.STRING
    },
    {}
  );
  CallUsers.associate = function(models) {
    CallUsers.hasMany(models.CallSubscribes);
    CallUsers.hasOne(models.CallPlans);
  };
  return CallUsers;
};
