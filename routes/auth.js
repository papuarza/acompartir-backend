const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

const logInPromise = (user, req) => new Promise((resolve,reject) => {
  req.login(user, (err) => {
      if (err) return reject('Something went wrong');
      resolve(user);
    });
});

authRoutes.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username })
  .populate('entity')
  .then( user => {
      if(!user) throw new Error('The username does not exist');
      if(!bcrypt.compareSync(password, user.password)) throw new Error('The password is not correct');
      return logInPromise(user,req);    
  })
  .then(user => res.status(200).json(user))
  .catch(e => res.status(500).json({message:e.message}));

});

authRoutes.post("/signup", (req, res, next) => {
  const username  = req.body.email;
  const { password, role, name, lastName } = req.body;
  if (username === "" || password === "") {
    res.send({status: 402, message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.send({status: 402, message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = { username, password: hashPass, role, name, lastName };

    User.create(newUser)
    .then(user => {
      req.login(user, (err, newUser) => {
        res.send({status: 200, data: user});
      })
    })
    .catch(err => {
      res.send({status: 500, message: "Error en el servidor"});
    });
  });
});

authRoutes.get('/loggedin', (req, res) => {
  if(req.user){
    User.findOne({ username: req.user.username })
    .populate('entity')
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(e => res.status(500).json({message:e.message}));   
  }else{
      return res.status(400).json({message:"You should loggin first"});
  }
});

authRoutes.get('/logout', (req, res) => {
  if(req.user){
      req.logout();
      return res.status(200).json({message:"User logged out"});
  }else{
      return res.status(400).json({message:"You should loggin first"});
  }
});

module.exports = authRoutes;

  






