const model = require("../models");
const Video = model.Video;

Videos = () => {};

Videos.addVideo = async (name, path) => {
  let promise = await Video.create({
    name: name,
    path: path
  });
  return promise;
};

Videos.getVideo = async () => {
  let promise = await Video.findAll();
  return promise;
};

module.exports = Videos;
