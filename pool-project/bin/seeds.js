const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pool-project', { useMongoClient: true} );

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const Center = require('../models/Center');
const User = require('../models/User');
const Tournament = require('../models/Tournament');

const users = [
  {
    username: 'nikoto',
    password: 'irondev',
    level: 'intermediate'
  },
  {
    username: 'ernes',
    password: 'bestfresi',
    level: 'intermediate'
  }
];

const salt = bcrypt.genSaltSync(bcryptSalt);
const encryptedPass = bcrypt.hashSync(password, salt);

User.collection.drop();
User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.username)
  });

  const centers = [
    {
      name: 'Gran Match',
      address: 'Calle de Brescia, 19, 28028 Madrid',
      tables: 20,
      size: 'Big',
      latitude: 40.436772,
      longitude: -3.662267,
      phone: 913613294
    },
  ];
});

Center.collection.drop();
Center.create(centers, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(center.name)
  });
});

// const tournaments = [
//   {
//     name: 'IronPool First Edition',
//     level: 'beginner',
//     participants: 16,
//     startDate: 22/11/2017,
//     endingDate: 28/11/2017,
//     winner: '',
//     creator: '',
//   },
// ];
//
// Tournament.collection.drop();
// Tournament.create(tournaments, (err, docs) => {
//   if (err) {
//     throw err;
//   }
//   docs.forEach((tournament) => {
//     console.log(tournament.name)
//   });

  mongoose.connection.close();
