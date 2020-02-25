const model = require("../models");
const Sub = model.CallSubscribes;
const Users = model.CallUsers;

Subs = () => {};

Subs.addSub = async (id, duration) => {
  let promise = await Sub.create({ validity: duration, UserId: id });
  return promise;
};

Subs.getSub = async id => {
  let promise = await Sub.findOne({
    attributes: ["UserId", "validity"],
    where: { UserId: id }
  });
  return promise;
};

Subs.delSub = async id => {
  let promise;
  try {
    promise = await Sub.destroy({
      where: { UserId: id }
    });
  } catch (e) {
    console.log("errorr", e);
    promise = e;
  }
  console.log(promise);
  return promise;
};

Subs.getValidity = async id => {
  let promise = await Sub.findOne({
    attributes: ["validity"],
    where: { UserId: id }
  });
  return promise;
};

Subs.getData = async id => {
  let promise = await Sub.findOne({
    attributes: ["validity"],
    where: { UserId: id }
  });
  return promise;
};

module.exports = Subs;
