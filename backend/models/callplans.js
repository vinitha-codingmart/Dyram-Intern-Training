"use strict";
module.exports = (sequelize, DataTypes) => {
  const CallPlans = sequelize.define(
    "CallPlans",
    {
      plan: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  CallPlans.associate = function(models) {
    CallPlans.belongsTo(models.CallUsers);
  };
  return CallPlans;
};
