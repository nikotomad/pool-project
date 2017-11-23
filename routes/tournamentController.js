const express = require('express');
const tournamentController = express.Router();
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const flash = require("connect-flash");
const ensureLogin = require("connect-ensure-login");

// Show tournaments

tournamentController.get("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  Tournament.find({}, (err, tournament) => {
    if(err){ return next(err); }
    res.render('tournaments/show', {
      tournament: tournament
    });
  });
});

tournamentController.post("/", ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  console.log(req.body.level);
  const lvl = req.body.level;
  Tournament.find({level: lvl})
    .then(tournaments => res.render('tournaments/show', {tournament: tournaments}))
    .catch(err => console.log("(eeeerrorrr"));
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
    .catch(err => next(err));
});

tournamentController.get('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  let isParticipant = false;
  Tournament.findById(req.params.id)
   .populate("participants")
   .populate("creator")
   .then(result =>  {
     for(let i = 0; i < result.participants.length; i++) {
       if(result.participants[i].username === req.user.username)
         isParticipant = true;
      }
     res.render("tournaments/detail",{ result, isParticipant });
   });
});

tournamentController.post('/detail/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  const tournamentId = req.params.id;
  Tournament.findByIdAndUpdate(tournamentId,
    { "$push": { "participants": req.user._id } }, { new:true })
    .then(() => res.redirect("/tournaments/detail/" + tournamentId))
    .catch(err => console.log(err));
});


module.exports = tournamentController;
