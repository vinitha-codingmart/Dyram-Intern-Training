const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const routes = require("./routes/appRoutes");
const password = require("./config/passwords.json");

const port = 3031;

const sequelize = new Sequelize("test", "dbuser", password.dbpass, {
  dialect: "mysql",
  host: "localhost"
});

app.listen(port, () => {
  console.log("App running on : ", port);
});

sequelize.authenticate().then(() => {
  console.log("Connected to DB");
});

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
routes(app);
