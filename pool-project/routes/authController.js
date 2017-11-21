const express = require('express');
const authController = express.Router();
const User = require("../models/User");
const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const flash = require("connect-flash");
const multer = require("multer");
const upload = multer({ dest: './public/uploads/'});

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

authController.post("/signup", upload.single('photo'),(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const level = req.body.level;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass,
      level
    });
    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

authController.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authController;
