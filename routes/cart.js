const express = require('express');
const router  = express.Router();
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');


router.get('/', (req, res, next) => {
  Cart.find()
  .populate({
    path: 'user', 
    populate: { path: 'entity' }
  })
  .populate({path: 'products.product'})
    .then(carts => {
      res.send({ status: 200, data: carts })
    })
    .catch(error => res.send( { status: 500, error }))
});

router.get('/user', (req, res, next) => {
  if(req.user) {
    Cart.findOne({user: req.user._id})
    .populate('user')
    .populate({path: 'products.product'})
      .then(cart => {
        res.send({ status: 200, data: cart })
      })
      .catch(error => res.send( { status: 500, error }))
  } else {
    res.send({ status: 200, data: {} })
  }
});

router.get('/:id', (req, res, next) => {
  Cart.findOne({_id: req.params.id})
  .populate({
    path: 'user', 
    populate: { path: 'entity' }
  })
  .populate({path: 'products.product'})
    .then(cart => {
      res.send({ status: 200, data: cart })
    })
    .catch(error => res.send( { status: 500, error }))
});

router.post('/', (req, res, next) => {
  Cart.findOne({user: req.user._id})
  .populate({
    path: 'products.product',
  })
  .lean()
  .exec((error, cart) => {
    if(!cart) {
      const newCart = {
        products: [
          { 
            product: req.body.data.producto._id,
            qty: req.body.data.qty
          }
        ],
        user: req.user._id
      }
      Cart.create(newCart)
      .then(cartCreated => {
        res.send({ status: 200, data: cartCreated })
      })
    } else {
      if(cart.products.length == 0) {
        otherProduct = {
          product: req.body.data.producto._id,
          qty: req.body.data.qty
        }
        Cart.findOneAndUpdate({user: req.user._id}, {$push: {products: otherProduct}}, {new: true})
          .lean()
          .exec((error, cart) => {
            res.send({ status: 200, data: {message: `El producto ha sido agregado`} })
          })
      } else {
        let repeatedProduct = false;
        cart.products.forEach(productElem => {
          if(productElem.product._id == req.body.data.producto._id) {
            repeatedProduct = true;
            // if(productElem.qty + req.body.data.qty > productElem.product.maxCantidad) {
            //   res.send({ status: 201, data: {message: `El número de productos excede el máximo de ${productElem.product.maxCantidad} productos para esta referencia.`} });
            // } else {
              let incQty = req.body.data.qty;
              if(req.body.data.type == 'less') incQty = -1;
              if(req.body.data.type == 'more') incQty = 1;
              Cart.findOneAndUpdate({$and: [{user: req.user._id}, {'products.product': {_id: req.body.data.producto._id}}]}, {$inc: {'products.$.qty': incQty}}, {new: true})
              .lean()
              .exec((error, cart) => {
                res.send({ status: 200, data: {message: `El producto ha sido sumado`} })
              })
            // }
          }
        })
        if(!repeatedProduct) {
          otherProduct = {
            product: req.body.data.producto._id,
            qty: req.body.data.qty
          }
          Cart.findOneAndUpdate({user: req.user._id}, {$push: {products: otherProduct}}, {new: true})
            .lean()
            .exec((error, cart) => {
              res.send({ status: 200, data: {message: `El producto ha sido agregado`} })
            })
        }
      }
    }
  })
});

router.post('/remove', (req, res, next) => {
  Cart.findOneAndUpdate({user: req.user._id}, { $pull: { products: {product: req.body.data}}}, {new: true})
  .populate({
    path: 'products.product',
  })
  .lean()
  .exec((error, cart) => {
    res.send({status: 200, data: cart})
  })
});

router.put('/', (req, res, next) => {
  Cart.findOneAndUpdate({user: req.user._id}, {deliver: req.body.data})
  .populate('user')
  .populate({path: 'products.product'})
    .then(cart => {
      
      res.send({ status: 200, data: cart })
    })
    .catch(error => res.send( { status: 500, error }))
});

router.put('/extra', (req, res, next) => {
  const { personasBeneficiadas, colectivos, consumoPropio, reparto } = req.body.data;
  Cart.findOneAndUpdate({user: req.user._id}, {personasBeneficiadas, colectivos, consumoPropio, reparto}, {new:true})
  .populate('user')
  .populate({path: 'products.product'})
    .then(cart => {
      res.send({ status: 200, data: cart })
    })
    .catch(error => res.send( { status: 500, error }))
});

module.exports = router;