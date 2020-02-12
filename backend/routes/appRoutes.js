module.exports = app => {
  const multer = require("multer");
  const fs = require("fs");

  const Videos = require("../controllers/videoController");
  const Users = require("../controllers/userController");

  let Storage = multer.diskStorage({
    destination: "../public/videos",
    filename: function(req, file, callback) {
      callback(
        null,
        file.fieldname + "_" + Date.now() + "_" + file.originalname + ".webm"
      );
    }
  });

  var upload = multer({
    storage: Storage
  }).single("file");

  app.get("/", (req, res) => {
    res.send("Working Fine!!");
  });

  app.post("/uploadMovie", upload, async (req, res) => {
    let resp = await Videos.addVideo(req.file.filename, req.file.path);
    res.send(resp);
  });

  app.post("/getList", async (req, res) => {
    let resp = await Videos.getVideo();
    res.send(resp);
  });

  app.post("/login", async (req, res) => {
    let resp = await Users.logUser(req.body.name, req.body.pass);
    res.send(resp);
  });

  app.post("/signup", async (req, res) => {
    let resp = await Users.addUser(req.body.name, req.body.pass);
    res.send(resp);
  });

  app.get("/liveVideo", upload, async (req, res) => {
    if (req != null) {
      let path = req.file.path;
      let stat = fs.statSync(path);
      let fileSize = stat.size;
      console.log(fileSize);
    }
  });

  app.get("/live", (req, res) => {
    const path =
      "/home/system12/reactProject/record-app/public/videos/file_1581318651325_blob.webm";
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/webm"
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/webm"
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  });
};
