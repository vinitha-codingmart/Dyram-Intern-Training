const model = require("../models");
const Plan = model.CallPlans;
const Users = model.CallUsers;

Plans = () => {};

Plans.addPlans = async (id, planId) => {
  let prom = await Plan.findOne({
    attributes: ["UserId", "plan"],
    where: { UserId: id }
  });
  if (prom) {
    await Plan.destroy({
      where: { UserId: id }
    });
  }
  let promise = await Plan.create({ UserId: id, plan: planId });
  return promise;
};

Plans.getPlans = async id => {
  let promise = await Plan.findOne({
    attributes: ["plan"],
    where: { UserId: id }
  });
  return promise;
};

module.exports = Plans;
