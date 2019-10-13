require('dotenv').config();
const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();
const Entity = require('../models/Entity.js');
const User = require('../models/User.js');
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const sendGrid = require('../config/sendgrid');


router.get('/', (req, res, next) => {
  Entity.find()
  .sort({ref: 1})
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
    beneficiarios,
    beneficiariosTotales,
    actividadCentro,
    numeroRegistro,
    colectivos
  } = req.body.entity;
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
    voluntarios,
    empleados,
    beneficiarios,
    beneficiariosTotales,
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
      .sort({ ref: -1 })
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
            const data = { to: entidad.email, personaContacto: entidad.personaContacto}
            const subject = 'Bienvenido a Acompartir';
            
            sendGrid.sendWelcomeEmail(process.env.FROM_EMAIL, subject, data)
            .then(response => {
              res.send({ status: 200, data: entidad })
            })
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

router.put('/:ref', (req, res, next) => {
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
    beneficiarios,
    beneficiariosTotales,
    actividadCentro,
    numeroRegistro,
    colectivos
  } = req.body.entity;
  const direccion = {
    principal: req.body.entity.principal,
    ciudad: req.body.entity.ciudad,
    provincia: req.body.entity.provincia,
    codigoPostal: req.body.entity.codigoPostal
  }
  let direccionFacturacion = direccion;
  if(req.body.entity.facturacion) {
    direccionFacturacion = {
      principal: req.body.entity.facturacion.principal,
      ciudad: req.body.entity.facturacion.ciudad,
      provincia: req.body.entity.facturacion.provincia,
      codigoPostal: req.body.entity.facturacion.codigoPostal
    }
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
    voluntarios,
    empleados,
    beneficiarios,
    beneficiariosTotales,
    actividadCentro,
    numeroRegistro,
    direccion,
    direccion_facturacion: direccionFacturacion,
    direcciones_envio: [direccion]
  }
  Entity.findOne({ ref: req.params.ref })
  .then(entity => {
    if(entity.email !== nuevaEntidad.email) {
      User.findOneAndUpdate({entity: entity._id}, {username: nuevaEntidad.email}, {new: true})
      .then(updatedUser => {
        Entity.findOneAndUpdate({ ref: req.params.ref }, nuevaEntidad, { new: true })
          .then(updatedEntity => res.send({ status: 200, data: updatedEntity }))
          .catch(error => res.send( { status: 500, error }))
      })
    } else {
      Entity.findOneAndUpdate({ ref: req.params.ref }, nuevaEntidad, { new: true })
          .then(updatedEntity => res.send({ status: 200, data: updatedEntity }))
          .catch(error => res.send( { status: 500, error }))
    }
  })
  
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

router.post('/foto', uploadCloud.single('file'), (req, res, next) => {
  Entity.findOneAndUpdate({ref: req.body.ref}, {logo: req.file.url}, {new: true})
  .then(entity => {
    res.status(200).json(entity)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;

