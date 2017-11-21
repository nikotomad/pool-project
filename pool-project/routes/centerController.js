const express = require('express');
const centerController = express.Router();
const Center = require('../models/Center');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");

// show centers

centerController.get("/", (req, res, next) => {
  Center.find({}, (err, center) => {
    if(err){ return next(err) }
    res.render('centers/show', {
      center: center
    });
  });
});

// specific center details

centerController.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;

  Center.findById(id, (err, center) => {
    res.render('centers/detail', {
      center: center
    })
  })
});

module.exports = centerController;
