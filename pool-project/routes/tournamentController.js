const express = require('express');
const tournamentController = express.Router();
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");

// show tournaments

tournamentController.get("/", (req, res, next) => {
  Tournament.find({}, (err, tournament) => {
    if(err){ return next(err) }
    res.render('tournaments/show', {
      tournament: tournament
    });
  });
});

// new tournament

tournamentController.get("/new", (req, res, next) => {
  res.render("tournaments/new");
});

tournamentController.post("/new", (req, res, next) => {
  const newTournament = new Tournament({
    name: req.body.name,
    level: req.body.level,
    maxParticipants: req.body.maxParticipants,
    startDate: req.body.startdate,
    endingDate: req.body.endingdate,
    creator: req.user._id
  });

  console.log(req.user);
  console.log('User ID: ' + req.user._id);

  newTournament.save()
    .then(() => res.redirect("/"))
    .catch(err => next(err))
});

// specific tournament details

tournamentController.get('/detail/:id', (req, res, next) => {
  let id = req.params.id;

  Tournament.findById(id, (err, tournament) => {
    res.render('tournaments/detail', {
      tournament: tournament
    })
  })
});

module.exports = tournamentController;
