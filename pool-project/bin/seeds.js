const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pool-project', { useMongoClient: true} );

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const Center = require('../models/Center');
const User = require('../models/User');
const Tournament = require('../models/Tournament');

var pass = 'irondev';
const salt = bcrypt.genSaltSync(bcryptSalt);
const encryptedPass = bcrypt.hashSync(pass, salt);

const users = [
  {
    username: 'nikoto',
    password: encryptedPass,
    level: 'intermediate'
  },
  {
    username: 'ernes',
    password: encryptedPass,
    level: 'intermediate'
  }
];

User.collection.drop();
User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((user) => {
    console.log('User: ' + user.username);
  });
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
  }
];

Center.collection.drop();
Center.create(centers, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((center) => {
    console.log('Center: ' + center.name);
  });
 });

const tournaments = [
  {
    name: 'IronPool First Edition',
    level: 'beginner',
    maxParticipants: 16,
    participants:['5a12d574e1882f4b89843aee','5a12ecf64845e64daa68303a'],
    startDate: new Date('2017-11-22'),
    endingDate: new Date('2017-11-28'),
    winner: '',
    creator: '5a12d574e1882f4b89843aee',
  },
  {
    name: 'Warriors of Pool',
    level: 'intermediate',
    maxParticipants: 8,
    participants:['5a12d574e1882f4b89843aee','5a12ecf64845e64daa68303a'],
    startDate: new Date('2017-12-06'),
    endingDate: new Date('2017-12-14'),
    winner: '',
    creator: '5a12ecf64845e64daa68303a',
  }
];

Tournament.collection.drop();
Tournament.create(tournaments, (err, docs) => {
  if (err) {
    throw err;
  }
  docs.forEach((tournament) => {
    console.log('Tournament: ' + tournament.name);
  });
});

mongoose.connection.close();
