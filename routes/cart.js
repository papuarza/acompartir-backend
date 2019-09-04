const express = require('express');
const router  = express.Router();
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');


router.get('/', (req, res, next) => {
  Cart.find()
    .then(carts => res.send({ status: 200, data: carts }))
    .catch(error => res.send( { status: 500, error }))
});

router.get('/user', (req, res, next) => {
  Cart.findOne({user: req.user._id})
  .populate('user')
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
            if(productElem.qty + req.body.data.qty > productElem.product.maxCantidad) {
              res.send({ status: 201, data: {message: `El número de productos excede el máximo de ${productElem.product.maxCantidad} productos para esta referencia.`} });
            } else {
              Cart.findOneAndUpdate({'products.product': {_id: req.body.data.producto._id}}, {$inc: {'products.$.qty': req.body.data.qty}}, {new: true})
              .lean()
              .exec((error, cart) => {
                res.send({ status: 200, data: {message: `El producto ha sido sumado`} })
              })
            }
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

module.exports = router;