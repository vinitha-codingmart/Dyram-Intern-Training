const express = require("express"),
  http = require("http");
const app = express();
var server = http.createServer(app);
const bodyParser = require("body-parser");
const cors = require("cors");
const Sequelize = require("sequelize");

//Node Media Server
const node_media_server = require("./media_server");
app.use(cors());
//Socket.io
var io = require("socket.io").listen(server);
server.listen(3031);
// var server = app.listen(3031);
// var io = require("socket.io").listen(server);

io.on("connection", function(socket) {
  console.log("socket connected");
  socket.on("stream", function(image) {
    // socket.broadcast.emit("stream", image);
    console.log(image);

    io.sockets.emit("videodata", image);
  });

  // socket.on("disconnect", function() {
  //   console.log("Socket disconnected");
  // });
});

const routes = require("./routes/appRoutes");
const password = require("./config/passwords.json");

const port = 3031;

const sequelize = new Sequelize("test", "dbuser", password.videoDb, {
  dialect: "mysql",
  host: "localhost"
});

node_media_server.run();

sequelize.authenticate().then(() => {
  console.log("Connected to DB");
});

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
routes(app);
