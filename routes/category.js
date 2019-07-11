const express = require('express');
const router  = express.Router();
const Category = require('../models/Category.js');


router.get('/', (req, res, next) => {
  Category.find()
    .then(categories => res.send({ status: 200, data: categories }))
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.send({ status: 200, data: category }))
    .catch(error => res.send( { status: 500, error }))
});

router.put('/:id', (req, res, next) => {
  Category.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(category => res.send({ status: 200, data: category }))
    .catch(error => res.send( { status: 500, error }))
});

router.delete('/:id', (req, res, next) => {
  Category.findOneAndRemove({ _id: req.params.id })
    .then(category => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/:id', (req, res, next) => {
  Category.findOne({ _id: req.params.id })
    .then(category => res.send({ status: 200, data: category }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;
