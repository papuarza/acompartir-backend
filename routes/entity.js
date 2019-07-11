const express = require('express');
const router  = express.Router();
const Entity = require('../models/Entity.js');


router.get('/', (req, res, next) => {
  Entity.find()
    .then(entities => res.send({ status: 200, data: entities }))
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  Entity.create(req.body)
    .then(entity => res.send({ status: 200, data: entity }))
    .catch(error => res.send( { status: 500, error }))
});

router.put('/:id', (req, res, next) => {
  Entity.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(entity => res.send({ status: 200, data: entity }))
    .catch(error => res.send( { status: 500, error }))
});

router.delete('/:id', (req, res, next) => {
  Entity.findOneAndRemove({ _id: req.params.id })
    .then(entity => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/:id', (req, res, next) => {
  Entity.findOne({ _id: req.params.id })
    .then(entity => res.send({ status: 200, data: category }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;
