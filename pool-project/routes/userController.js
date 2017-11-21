const express = require('express');
const userController = express.Router();
const User = require("../models/User");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

userController.get("/", (req, res, next) => {
  User.find({}, (err, user) => {
    if(err){ return next(err) }
    res.render('user/show', {
      user: user
    });
  });
});

userController.get('/detail/:id', (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/detail', { user: user });
  });
});

userController.get('/:id/edit', (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) { return next(err); }
    res.render('user/edit', {
      user: user });
  });
});

userController.post('/:id', (req, res, next) => {
  const userId = req.params.id;

  const updates = {
      username: req.body.username,
      level: req.body.level,
      photo: req.body.photo,
      orientation: req.body.orientation,
      tournaments: req.body.tournaments,
      gamesWon: req.body.gamesWon
  };

  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/users');
  });
});



module.exports = userController;
