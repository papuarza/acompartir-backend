const express = require('express');
const router  = express.Router();
const Media = require('../models/Media.js');

router.get('/', (req, res, next) => {
  Media.find()
  .sort({_id: -1})
    .then(media => res.send({ status: 200, data: media }))
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  let { title, link, type} = req.body.data;
  let newMedia = {
    title, link, type
  }
  Media.create(newMedia)
    .then(media => res.send({ status: 200, data: media }))
    .catch(error => res.send( { status: 500, error }))
});

router.delete('/:id', (req, res, next) => {
  Media.findByIdAndRemove(req.params.id)
    .then(media => res.send({ status: 200, data: media }))
    .catch(error => res.send( { status: 500, error }))
});


module.exports = router;
