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

tournamentController.get("/:id", (req, res, next) => {
  let id = req.params.id;

  Tournament.findById(id, (err, tournament) => {
    res.render('tournaments/detail', {
      tournament: tournament
    });
  });
});

tournamentController.get("/new", (req, res, next) => {
  res.render("tournaments/new");
});

tournamentController.post("/new", (req, res, next) => {
  const name = req.body.name;
  const level = req.body.level;
  const maxParticipants = req.body.maxParticipants;
  const startDate = req.body.startdate;
  const endingDate = req.body.endingdate;

  if (name === "" || level === "") {
    res.render("tournaments/new", { message: "Indica un nombre de torneo y un nivel correspondiente." });
    return;
  }

  Tournament.findOne({ name }, "name", (err, user) => {
    if (name !== null) {
      res.render("tournaments/new", { message: "El torneo ya existe, elige otro nombre" });
      return;
    }

    const newTournament = new Tournament({
      name,
      level,
      maxParticipants,
      startDate,
      endingDate
    });

    newTournament.save((err) => {
      if (err) {
        res.render("tournaments/new", { message: "Algo ha fallado" });
      } else {
        res.redirect("/");
      }
    });
  });
});

module.exports = tournamentController;
