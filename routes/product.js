const express = require('express');
const uploadCloud = require('../config/cloudinary.js');
const router  = express.Router();
const Product = require('../models/Product.js');


router.get('/', (req, res, next) => {
  Product.find({mostrar: true})
    .then(products => res.send({ status: 200, data: products }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/panel', (req, res, next) => {
  Product.find()
    .then(products => res.send({ status: 200, data: products }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/:ref', (req, res, next) => {
  Product.findOne({ref: req.params.ref})
    .then(product => {
      res.send({ status: 200, data: product })
    })
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  const {
    ref,
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria,  
    presentacion, 
    stock, 
    unidadesPorCaja, 
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    company, 
    pesoPorCaja, 
    cajasPorPalet,
    showCompany
  } = req.body.product;
  const totalCantidad = stock * unidadesPorCaja;
  const precioOriginalTotal = precioOriginal * unidadesPorCaja;
  let precioAcompartir = precioOriginalTotal * (porcentajeAcompartir/100);
  precioAcompartir = precioAcompartir.toFixed(2);
  const nuevoProducto = {
    ref,
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria, 
    presentacion, 
    stock, 
    unidadesPorCaja, 
    totalCantidad,
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    precioAcompartir,
    precioOriginalTotal,
    company,
    pesoPorCaja, 
    cajasPorPalet,
    showCompany
  }
  Product.find()
  .sort({ _id: -1 })
  .limit(1)
  .lean()
  .exec((err, model) => { 
    Product.create(nuevoProducto)
    .then(product => {
      res.send({ status: 200, data: product })
    })
    .catch(error => res.send( { status: 500, error }))
  });
  
});

router.put('/:id', (req, res, next) => {
  const {
    ref,
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria,  
    presentacion, 
    stock, 
    unidadesPorCaja, 
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    company, 
    pesoPorCaja, 
    cajasPorPalet,
    showCompany,
  } = req.body.product;
  const totalCantidad = stock * unidadesPorCaja;
  const precioOriginalTotal = precioOriginal * unidadesPorCaja;
  let precioAcompartir = precioOriginalTotal * (porcentajeAcompartir/100);
  precioAcompartir = precioAcompartir.toFixed(2);
  const nuevoProducto = {
    ref,
    titulo, 
    descripcionCorta, 
    descripcion, 
    categoria, 
    presentacion, 
    stock, 
    unidadesPorCaja, 
    totalCantidad,
    maxCantidad, 
    minCantidad, 
    precioOriginal, 
    porcentajeAcompartir, 
    precioAcompartir,
    precioOriginalTotal,
    company,
    pesoPorCaja, 
    cajasPorPalet,
    showCompany
  }
  Product.findOneAndUpdate({ _id: req.params.id }, nuevoProducto, { new: true })
    .then(product => res.send({ status: 200, data: product }))
    .catch(error => res.send( { status: 500, error }))
});

router.put('/toggle/:ref', (req, res, next) => {
  Product.findOne({ref: req.params.ref })
  .then(producto => {
    Product.findOneAndUpdate({ ref: req.params.ref }, { $set: {mostrar: !producto.mostrar} }, { new: true })
      .then(product => res.send({ status: 200, data: product }))
      .catch(error => res.send( { status: 500, error }))
  })
});

router.delete('/:ref', (req, res, next) => {
  Product.findOneAndRemove({ ref: req.params.ref })
    .then(product => res.send({ status: 200, data: 'Ha sido eliminado correctamente' }))
    .catch(error => res.send( { status: 500, error }))
});

router.post('/foto', uploadCloud.single('file'), (req, res, next) => {
  Product.findOneAndUpdate({ref: req.body.ref}, {foto: req.file.url}, {new: true})
  .then(producto => {
    res.status(200).json(producto)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;
