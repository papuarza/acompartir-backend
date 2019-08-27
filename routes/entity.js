const express = require('express');
const router  = express.Router();
const Entity = require('../models/Entity.js');
const User = require('../models/User.js');
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get('/', (req, res, next) => {
  Entity.find()
    .then(entities => res.send({ status: 200, data: entities }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/:ref', (req, res, next) => {
  Entity.findOne({ref: req.params.ref})
    .then(entity => {
      res.send({ status: 200, data: entity })
    })
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  const {
    nombre,
    cif,
    telefono,
    movil,
    email,
    web,
    comentarios,
    personaContacto,
    razonSocial,
    voluntarios,
    empleados,
    personasAtendidas,
    actividadCentro,
    numeroRegistro
  } = req.body.entity;
  const fechaConstitucion = new Date(req.body.entity.fechaConstitucion);
  const colectivos = req.body.entity.colectivos.trim().split(",");
  const direccion = {
    principal: req.body.entity.principal,
    ciudad: req.body.entity.ciudad,
    provincia: req.body.entity.provincia,
    codigoPostal: req.body.entity.codigoPostal
  }
  const nuevaEntidad = {
    nombre,
    cif,
    telefono,
    movil,
    email,
    web,
    comentarios,
    personaContacto,
    razonSocial,
    colectivos,
    fechaConstitucion,
    voluntarios,
    empleados,
    personasAtendidas,
    actividadCentro,
    numeroRegistro,
    direccion,
    direccion_facturacion: direccion,
    direcciones_envio: [direccion]
  }
  //CREAR USUARIO FIRST!
  const username  = email;
  const password = 'ayudamos';
  const role = 'client';
  const name = personaContacto;
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
    const newUser = { username, password: hashPass, role, name };

    User.create(newUser)
    .then(user => {
      Entity.find()
      .sort({ _id: -1 })
      .limit(1)
      .lean()
      .exec((err, model) => { 
        let newRef = 1;
        if(model.length > 0) { newRef = model[0].ref + 1;}
        nuevaEntidad['ref'] = newRef;
        Entity.create(nuevaEntidad)
        .then(entidad => {
          User.findByIdAndUpdate(user._id, {entity: entidad._id})
          .then(userUpdated => {
            res.send({ status: 200, data: entidad })
          })
        })
        .catch(error => res.send( { status: 500, error }))
      });
    })
    .catch(err => {
      res.send({status: 500, message: "Error en el servidor"});
    });
  });


  
});

router.put('/:id', (req, res, next) => {
  Entity.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(entity => res.send({ status: 200, data: entity }))
    .catch(error => res.send( { status: 500, error }))
});

router.put('/toggle/:ref', (req, res, next) => {
  Entity.findOne({ref: req.params.ref })
  .then(entidad => {
    Entity.findOneAndUpdate({ ref: req.params.ref }, { $set: {active: !entidad.active} }, { new: true })
      .then(product => res.send({ status: 200, data: product }))
      .catch(error => res.send( { status: 500, error }))
  })
});

router.delete('/:ref', (req, res, next) => {
  Entity.findOneAndRemove({ ref: req.params.ref })
    .then(product => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;

