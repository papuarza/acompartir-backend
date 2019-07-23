const express = require('express');
const router  = express.Router();
const Product = require('../models/Product.js');


router.get('/', (req, res, next) => {
  Product.find()
    .then(products => res.send({ status: 200, data: products }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/:ref', (req, res, next) => {
  Product.findOne({ref: req.params.ref})
    .then(product => res.send({ status: 200, data: product }))
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  const {
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria, 
    subCategoria, 
    presentacion, 
    packCantidad, 
    unidadPackCantidad, 
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    company, 
    showCompany, 
    demandaAlta, 
    peso, 
    boxPalets,
  } = req.body.product;
  const totalCantidad = packCantidad * unidadPackCantidad;
  const precioAcompartir = precioOriginal * (porcentajeAcompartir/100);
  const nuevoProducto = {
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria, 
    subCategoria, 
    presentacion, 
    packCantidad, 
    unidadPackCantidad, 
    totalCantidad,
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    precioAcompartir,
    company, 
    showCompany, 
    demandaAlta, 
    peso, 
    boxPalets,
  }
  Product.find()
  .sort({ _id: -1 })
  .limit(1)
  .lean()
  .exec((err, model) => { 
    let newRef = model[0].ref + 1;
    nuevoProducto['ref'] = newRef;
    Product.create(nuevoProducto)
    .then(product => res.send({ status: 200, data: product }))
    .catch(error => res.send( { status: 500, error }))
  });
  
});

router.put('/:ref', (req, res, next) => {
  Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(product => res.send({ status: 200, data: product }))
    .catch(error => res.send( { status: 500, error }))
});

router.delete('/:ref', (req, res, next) => {
  Product.findOneAndRemove({ ref: req.params.ref })
    .then(product => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;