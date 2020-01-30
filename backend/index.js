const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/appRoutes");
const url = require("./config/urls.json");

const port = 3000;
const dburl = url.dburl;

mongoose
  .connect(
    dburl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      console.log(err);
    }
  )
  .then(() => {
    console.log("Db Connected");
  });

app.listen(port, console.log("Active on port : ", port));

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
routes(app);
