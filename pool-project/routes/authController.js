const express = require('express');
const authController  = express.Router();
const User = require("../models/User");
const passport = require('passport');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authController.get('/signup', (req, res, next) => {
  res.render('auth/signup', {
    errorMessage: ''
  });
});

authController.post("/signup", (req, res, next) => {
  const {username, password, level, photo} = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indica nombre de usuario y contraseña" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "Ese nombre de usuario ya existe" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      level,
      photo,
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Se ha producido un error" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authController.get('/login', (req, res) => {
  res.render('auth/login', {
  errorMessage: ''
});
});

authController.post("/login", (req, res, next) => {
  const {username, password} = req.body;

  if (email === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Indica un mail y una contraseña"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
      if (err || !user) {
        res.render("auth/login", {
          errorMessage: "La dirección de email no existe"
        });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {

        req.session.currentUser = user;
        res.render('auth/home', {user: user});
      }
      else {
        res.render("auth/login", {
          errorMessage: "Contraseña incorrecta"
        });
      }
  });
});

authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
