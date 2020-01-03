const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
var mysql = require("mysql");

//static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  fs.createReadStream(__dirname + "/index.html", "utf8").pipe(res);
});

app.get("/get/table", (req, res) => {
  getTable(result => {
    res.write(JSON.stringify(result));
    res.end();
  });
});

app.get("/addData", (req, res) => {
  var id = req.param("id");
  var name = req.param("name");
  console.log(id + " " + name);
  insertData(id, name, result => {
    res.redirect("/");
  });
});

app.get("/editData", (req, res) => {
  var id = req.param("id");
  var name = req.param("name");
  updateData(id, name, result => {
    res.redirect("/");
  });
});

app.get("/deleteData", (req, res) => {
  var id = req.param("id");
  var name = req.param("name");
  removeData(id, name, result => {
    res.redirect("/");
  });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "Devbro123!@#",
  database: "test",
  port: "3306"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("SQL Connected");
});

let getTable = onSuccess => {
  con.query("select * from emp;", function(err, result, fields) {
    if (err) throw err;
    else onSuccess(result);
  });
};

let insertData = (id, name, onSuccess) => {
  con.query(`insert into emp values(${id}, "${name}");`, function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    else onSuccess(result);
  });
};

let updateData = (id, name, onSuccess) => {
  con.query(`update emp set name ="${name}" where id = ${id};`, function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    else onSuccess(result);
  });
};

let removeData = (id, name, onSuccess) => {
  con.query(`delete from emp where id = ${id};`, function(err, result, fields) {
    if (err) throw err;
    else onSuccess(result);
  });
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
