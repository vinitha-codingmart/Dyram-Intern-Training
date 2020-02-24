const model = require("../models");
const Log = model.CallLogs;

Logs = () => {};

Logs.addLogs = async (id, duration) => {
  let promise = await Log.create({ duration: duration, UserId: id });
  return promise;
};

module.exports = Logs;
