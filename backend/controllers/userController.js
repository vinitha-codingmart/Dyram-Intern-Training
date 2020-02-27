const model = require("../models");
const User = model.CallUsers;
const Sequelize = require("sequelize");

const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");

const key = require("../config/keys.json");

Users = () => {};

Users.addUser = async (name, pass, validity, email) => {
  let promise = await User.create({
    name: name,
    password: passwordHash.generate(pass),
    validity,
    email
  });
  return promise;
};

Users.loginUser = async (name, pass) => {
  let promise = await User.findAll({
    attributes: ["id", "name", "password"],
    where: { name: name }
  });
  if (passwordHash.verify(pass, promise[0].password)) {
    token = {
      id: jwt.sign(
        {
          exp: Date.now() / 1000 + 60 * 60,
          id: promise[0].id
        },
        key.tokenKey
      ),
      validity: true
    };
    return token;
  } else {
    token = {
      id: jwt.sign({ id: promise[0].id }, key.tokenKey),
      validity: false
    };
    return token;
  }
};

Users.getUsers = async id => {
  let promise = await User.findOne({ where: { id } });
  return promise;
};

Users.getUserList = async id => {
  let Op = Sequelize.Op;
  let promise = await User.findAll({
    attributes: ["name", "email"],
    where: { id: { [Op.ne]: id } }
  });
  return promise;
};

module.exports = Users;
