const express = require('express');
const tournamentController = express.Router();
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");
const ensureLogin = require("connect-ensure-login");

// Show tournaments

tournamentController.get("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  Tournament.find({}, (err, tournament) => {
    if(err){ return next(err) }
    res.render('tournaments/show', {
      tournament: tournament
    });
  });
});

// New tournament

tournamentController.get("/new", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  res.render("tournaments/new");
});

tournamentController.post("/new", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
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
    .then(() => res.redirect("/tournaments"))
    .catch(err => next(err))
});

// Specific tournament details

tournamentController.get('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  Tournament.findById(req.params.id)
   .populate("creator")
   .then(result =>  res.render("tournaments/detail",{ result }))
});

// User signup for tournament participant

tournamentController.post('/detail/:id/add/', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const tournamentId = req.params.id;
  const updates = {
    participants: req.user._id,
  };
  User.findByIdAndUpdate(tournamentId, updates, (err, user) => {
    if (err){ return next(err); }
    return res.redirect('/tournaments/detail/:id');
  });
});

module.exports = tournamentController;
