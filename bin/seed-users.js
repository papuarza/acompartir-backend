require('dotenv').config();
const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt       = require('bcrypt');
const bcryptSalt   = 10;
const User = require('../models/User.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const admins = [
  {
    username: 'leticia',
    password: 'acompartir2019!',
    role: 'owner',
  },
  {
    username: 'papu',
    password: 'papu',
    role: 'client'
  }
]

const hashAdmins = admins.map(elem => {
  let salt = bcrypt.genSaltSync(bcryptSalt);
  let hashPass = bcrypt.hashSync(elem.password, salt);
  elem['password'] = hashPass;
  return elem;
})

mongoose.connect(dbName)
  .then(() => {
    User.create(hashAdmins)
    .then(admins => {
      admins.forEach(admin => {
        console.log(`${admin.username} ha sido creado!`)
      })
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })

