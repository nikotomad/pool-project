const express = require('express');
const tournamentController = express.Router();
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");

tournamentController.get("/show", (req, res, next) => {
  Tournament.find({}, (err, tournament) => {
    if(err){ return next(err) }
    res.render('tournaments/show', {
      tournament: tournament
    });
  });
});

tournamentController.get('/:id', (req, res, next) => {
  Tournament.findById(req.params.id)
    .populate('creator')
    .then(result => res.render('tournaments/detail', {
      result: result
    }));
})

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

  newTournament.save()
    .then(() => res.redirect("/"))
    .catch(err => next(err))
});

module.exports = tournamentController;
