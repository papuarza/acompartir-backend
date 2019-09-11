const express = require('express');
const router  = express.Router();
const Donacion = require('../models/Donacion.js');

router.get('/', (req, res, next) => {
  Donacion.find()
    .then(donaciones => res.send({ status: 200, data: donaciones}))
    .catch(error => res.send( { status: 500, error }))
});


router.post('/', (req, res, next) => {
  const { nombre, apellido, movil, email, monto, colectivo } = req.body.donation;
  const newDonacion = { nombre, apellido, movil, email, monto, colectivo }
  Donacion.create(newDonacion)
  .then(donacion => {
    res.status(200).json(donacion)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res, next) => {
  Donacion.findOneAndRemove({ _id: req.params.id })
    .then(donacion => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;