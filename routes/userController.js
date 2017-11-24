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
    if(err){ return next(err); }
    res.render('user/show', {
      user: user
    });
  });
});

userController.post("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  console.log(req.body.username);
  const name = req.body.username;
  User.find({username: name})
    .then(users => res.render('user/show', {user: users}))
    .catch(err => console.log("(Error"));
});

userController.get('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then(user => res.render('user/detail', { user: user }))
    .catch(err => console.log("(Error"));

});


userController.get('/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const userId = req.params.id;
  Center.find({}, (err, center) => {
    if(err){ return next(err); }
  });
  User.findById(userId)
    .then(user => res.render('user/edit', { user: user}))
    .catch(err => console.log("Error"));
});

userController.post('/:id/edit', ensureLogin.ensureLoggedIn('/login'), upload.single('avatar'),(req, res, next) => {
  const userId = req.params.id;
  const updates = {
      username: req.body.username,
      level: req.body.level,
      avatar: req.file.filename,
      favoriteCenter: req.body.favoriteCenter,
      orientation: req.body.orientation,
      tournaments: req.body.tournaments,
      gamesWon: req.body.gamesWon
  };

  User.findByIdAndUpdate(userId)
    .then(user => res.redirect('/home'))
    .catch(err => console.log("Error"));
});



module.exports = userController;
