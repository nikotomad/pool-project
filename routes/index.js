const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('user is: ' + req.user);
  res.render('index');
});

router.get('/home', (req, res, next) => {
  console.log('user is: ' + req.user);
  res.render('home', { user: req.user });
});

module.exports = router;
