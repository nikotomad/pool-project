const express = require('express');
const authController = express.Router();
const User = require("../models/User");
const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const flash = require("connect-flash");
const multer = require("multer");
const upload = multer({ dest: './public/uploads/'});
const ensureLogin = require("connect-ensure-login");

authController.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

authController.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authController.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authController.post("/signup", upload.single('avatar'),(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const level = req.body.level;
  const orientation = req.body.orientation;
  const tournaments = req.body.tournaments;
  const gamesWon = req.body.gamesWon;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indica nombre de usuario y contraseña" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "El nombre de usuario ya existe" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass,
      level,
      orientation,
      tournaments,
      gamesWon

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

authController.get("/logout", ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
