module.exports = app => {
  const multer = require("multer");
  const fs = require("fs");

  const Calls = require("../controllers/callController");

  app.get("/", (req, res) => {
    res.send("Working Fine!!");
  });

  app.post("/storeCall", async (req, res) => {
    let resp = await Calls.addCall(
      req.body.channel,
      req.body.stats.Duration,
      req.body.stats.UserCount,
      req.body.stats.SendBytes,
      req.body.stats.RecvBytes,
      req.body.stats.SendBitrate,
      req.body.stats.RecvBitrate
    );
    res.send(resp);
  });
};
