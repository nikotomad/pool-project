const express = require('express');
const userController = express.Router();
const User = require("../models/User");
const Center = require("../models/Center");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const upload = multer({ dest: './public/uploads/'});
const ensureLogin = require("connect-ensure-login");

userController.get("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  User.find({}, (err, user) => {
    if(err){ return next(err) }
    res.render('user/show', {
      user: user
    });
  });
});

userController.get('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    console.log(user)
    res.render('user/detail', { user: user });

  });
});

userController.get('/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const userId = req.params.id;
  Center.find({}, (err, center) => {
    if(err){ return next(err) }
    console.log("kdkdkdkdk" + center)
  });
  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/edit', {
      user: user });
  });
});

userController.post('/:id/edit', ensureLogin.ensureLoggedIn('/login'), upload.single('avatar'),(req, res, next) => {
  const userId = req.params.id;
  console.log(req.body);
  const updates = {
      username: req.body.username,
      level: req.body.level,
      avatar: req.body.avatar,
      orientation: req.body.orientation,
      tournaments: req.body.tournaments,
      gamesWon: req.body.gamesWon
  };

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/home');
  });
});



module.exports = userController;
