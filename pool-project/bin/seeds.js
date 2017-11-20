const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pool-project', { useMongoClient: true} );

const User = require('../models/User');
const users = [
  {
    username: 'nikoto',
    password: 'irondev',
    nivel: 'intermediate'
  },
  {
    username: 'ernes',
    password: 'bestfresi',
    nivel: 'intermediate'
  },
  {
    username: 'alberto',
    password: 'alberto',
    nivel: 'beginner'
  },
  {
    username: 'christianvargas',
    password: 'granmatch',
    nivel: 'pro'
  }
];

User.collection.drop();
User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(user.username)
  });

  const Center = require('../models/Center');
  const centers = [
    {
      name: 'Gran Match',
      address: 'Calle de Brescia, 19, 28028 Madrid',
      tables: 20,
      size: 'Big',
      latitude: 40.436772,
      longitude: -3.662267,
      phone: 913 61 32 94,
    },
  ];

Center.collection.drop();
Center.create(centers, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log(center.name)
  });

// const Tournament = require('../models/Tournament');
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
});
