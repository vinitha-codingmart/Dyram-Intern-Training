const model = require("../models");
const User = model.Users;
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const key = require("../config/passwords.json");

Users = () => {};

Users.addUser = async (name, pass) => {
  let hpass = passwordHash.generate(pass);
  let promise = await User.create({
    name: name,
    password: hpass
  });
  return promise;
};

Users.logUser = async (name, pass) => {
  let user = await User.findOne({
    attributes: ["id", "name", "password"],
    where: { name: name }
  });
  let hpass = user.password;
  if (passwordHash.verify(pass, hpass)) {
    let token = {
      id: jwt.sign(
        { exp: Date.now() / 1000 + 60 * 60, id: user.id },
        key.tokenKey
      ),
      validity: true
    };
    return token;
  } else {
    let token = {
      id: jwt.sign({ id: user.id }, key.tokenKey),
      validity: false
    };
    return token;
  }
};

module.exports = Users;
