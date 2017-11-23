const express = require('express');
const centerController = express.Router();
const Center = require('../models/Center');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");
const ensureLogin = require("connect-ensure-login");

// show centers

centerController.get("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  Center.find({}, (err, center) => {
    if(err){ return next(err); }
    res.render('centers/show', {
      centers: center
    });
  });
});

// specific center details

centerController.get('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  let id = req.params.id;

  Center.findById(id, (err, center) => {
    res.render('centers/detail', {
      center: center
    });
  });
});

module.exports = centerController;
