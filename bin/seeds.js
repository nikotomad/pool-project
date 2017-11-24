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
    level: 'Intermedio'
  },
  {
    username: 'ernes',
    password: encryptedPass,
    level: 'Intermedio'
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
  },
  {
    name: 'Tilt Billar Club',
    address: 'Paseo Santa María de la Cabeza, 75',
    tables: 10,
    size: 'Medium',
    latitude: 40.398634,
    longitude: -3.701184,
    phone: 914744424
  },
  {
    name: 'Billarnet Café',
    address: 'Calle del Capitán Haya, 49',
    tables: 14,
    size: 'Big',
    latitude: 40.46295,
    longitude: -3.69187,
    phone: 915714144
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

mongoose.connection.close();
