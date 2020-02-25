"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallSubscribes = sequelize.define(
    "CallSubscribes",
    {
      validity: DataTypes.BIGINT,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  CallSubscribes.associate = function(models) {
    CallSubscribes.belongsTo(models.CallUsers);
  };
  return CallSubscribes;
};
