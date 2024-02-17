const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

//fazer o npm install bcrypt!

const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");
const db = require("../../models");

const usersController = {
  cadastro: (req, res) => {
    res.render("registerUser");
  },

  salvarCadastro: async (req, res) => {
    const newUser = {
      full_name: null,
      email: null,
      dob: null,
      gender: null,
      pw: null,
    };
    newUser.full_name = req.body.full_name;
    newUser.email = req.body.email;
    newUser.dob = req.body.dob;
    newUser.gender = req.body.gender;
    newUser.pw = bcrypt.hashSync(req.body.password, 10);

    await db.User.create(newUser);
    res.redirect("/user/login");
  },

  login: (req, res) => {
    res.render("login");
  },

  loginExec: async (req, res) => {
    let email = req.body.email;
    let pw = req.body.pw;

    if (await db.User.findOne({ where: { email: email } })) {
      var user = await db.User.findOne({ where: { email: email } });
    } else {
      return res.send("Email not found");
    }
    let emailDb = user.email;
    let pwDb = user.pw;

    if (email != (await emailDb)) {
      return res.send("Email not found");
    }
    if (!(await bcrypt.compare(pw, pwDb))) {
      return res.send("Wrong password!");
    }
    return res.render("profile", { user: user });
  },
};

module.exports = usersController;
