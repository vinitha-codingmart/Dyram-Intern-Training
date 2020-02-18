const model = require("../models");
const Call = model.Calls;

Calls = () => {};

Calls.addCall = async (
  channel,
  duration,
  userCount,
  sendBytes,
  recvBytes,
  sendBitrate,
  recvBitrate
) => {
  let promise = await Call.create({
    channel,
    duration,
    userCount,
    sendBytes,
    recvBytes,
    sendBitrate,
    recvBitrate
  });
  return promise;
};

module.exports = Calls;
