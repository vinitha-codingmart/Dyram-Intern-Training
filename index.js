const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");
var formidable = require("formidable");
var mysql = require("mysql");
var bodyParser = require("body-parser");

const encodeImage = require("image-to-base64");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

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

app.post("/addData", (req, res) => {
  var formz = new formidable.IncomingForm();
  formz.parse(req, function(err, fields, files) {
    console.log("home", err, fields, files);
    var name = files.image.name;
    var oldpath = files.image.path;
    var newpath = "/home/system12/dyramnews/images/" + files.image.name;
    console.log(oldpath + " " + newpath + "\nFilepath : " + files.image.path);
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
    });
    var id = fields.id;
    var name = fields.name;
    console.log(id + " " + name);
    var image = newpath.substr(24, 13 + name.length);
    console.log(id + " " + name + " " + image);
    insertData(id, name, image, result => {
      res.redirect("/");
    });
  });
});

app.post("/editData", (req, res) => {
  var formz = new formidable.IncomingForm();
  formz.parse(req, function(err, fields, files) {
    console.log("home", err, fields, files);
    var name = files.image.name;
    var oldpath = files.image.path;
    var newpath = "/home/system12/dyramnews/images/" + files.image.name;
    console.log(oldpath + " " + newpath + "\nFilepath : " + files.image.path);
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
    });
    var id = fields.id;
    var name = fields.name;
    console.log(id + " " + name);
    var image = newpath.substr(24, 13 + name.length);
    console.log(id + " " + name + " " + image);
    updateData(id, name, image, result => {
      res.redirect("/");
    });
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

let insertData = (id, name, image, onSuccess) => {
  con.query(`insert into emp values(${id}, "${name}","${image}");`, function(
    err,
    result,
    fields
  ) {
    if (err) throw err;
    else onSuccess(result);
  });
};

let updateData = (id, name, image, onSuccess) => {
  con.query(
    `update emp set name ="${name}",image="${image}" where id = ${id};`,
    function(err, result, fields) {
      if (err) throw err;
      else onSuccess(result);
    }
  );
};

let removeData = (id, name, onSuccess) => {
  con.query(`delete from emp where id = ${id};`, function(err, result, fields) {
    if (err) throw err;
    else onSuccess(result);
  });
};

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
