const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();
const Company = require('../models/Company.js');

router.get('/', (req, res, next) => {
  Company.find()
    .then(companies => res.send({ status: 200, data: companies}))
    .catch(error => res.send( { status: 500, error }))
});


router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const { name } = req.body;
  const photo = req.file.url;
  const newCompany = {photo, name}
  Company.create(newCompany)
  .then(company => {
    res.status(200).json(company)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res, next) => {
  Company.findOneAndRemove({ _id: req.params.id })
    .then(company => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;