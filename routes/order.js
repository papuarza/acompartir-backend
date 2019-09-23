const express = require('express');
const router  = express.Router();
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Order = require('../models/Order.js');
const sendGrid = require('../config/sendgrid');

checkStock = (products) => products.map(producto => producto.qty <= producto.product.stock ? true : false);

modifyTheStock = (products) => {
  let stockPromises = [];
  products.forEach(producto => {
    stockPromises.push(new Promise((resolve, reject) => {
      Product.findByIdAndUpdate(producto.product._id, {$inc: {stock: -producto.qty}}, {new: true})
      .then(updatedProducto => { resolve(updatedProducto)})
    }))
  })
  return Promise.all(stockPromises);
}

removeTheStock = (products) => {
  let stockPromises = [];
  products.forEach(producto => {
    stockPromises.push(new Promise((resolve, reject) => {
      Product.findByIdAndUpdate(producto.product._id, {$inc: {stock: producto.qty}}, {new: true})
      .then(updatedProducto => { resolve(updatedProducto)})
    }))
  })
  return Promise.all(stockPromises);
}


router.get('/single/:id', (req, res, next) => {
    Order.findById(req.params.id)
    .populate({
      path: 'user', 
      populate: { path: 'entity' }
    })
    .populate({path: 'products.product'})
    .then(orders => {
      res.send({status: 200, orders})
    })
});

router.get('/entity/:id', (req, res, next) => {
  User.findOne({entity: req.params.id})
  .then(user => {
    Order.find({user: user._id})
    .populate({
      path: 'user', 
      populate: { path: 'entity' }
    })
    .populate({path: 'products.product'})
    .then(orders => {
      res.send({status: 200, orders})
    })
  })
});

router.get('/', (req, res, next) => {
    Order.find()
    .populate({
      path: 'user', 
      populate: { path: 'entity' }
    })
    .populate({path: 'products.product'})
    .then(orders => {
      res.send({status: 200, orders})
    })
});

router.post('/company', (req, res, next) => {
  let products = req.body.products;
  Order.find({
    'products.product': { $in: products}
  })
  .populate({
    path: 'user', 
    populate: { path: 'entity' }
  })
  .populate({path: 'products.product'})
  .then(orders => {
    res.send({status: 200, orders})
  })
});

router.post('/', (req, res, next) => {
  const { id, paymentMethod } = req.body;
  Cart.findOne({_id: id})
    .populate({
      path: 'user', 
      populate: { path: 'entity' }
    })
    .populate({
      path: 'products.product'
    })
    .lean()
    .exec((error, cart) => {
      let checkTheStock = checkStock(cart.products);
      if(checkTheStock.includes(false)) {
        res.send({status: 203, product: cart.products[checkTheStock.indexOf(false)]});
      } else {
        modifyTheStock(cart.products)
        .then(updatedProducts => {
          let newOrder = {
            products: cart.products,
            user: cart.user,
            payment: paymentMethod,
            deliver: cart.deliver,
            personasBeneficiadas: cart.personasBeneficiadas,
            colectivos: cart.colectivos,
            consumoPropio: cart.consumoPropio,
            reparto: cart.reparto
          }
          if(cart.deliver == 'Entrega') {
            newOrder['deliverAddress'] = {
              principal: cart.user.entity.direccion.principal,
              ciudad: cart.user.entity.direccion.ciudad,
              provincia: cart.user.entity.direccion.provincia,
              codigoPostal: cart.user.entity.direccion.codigoPostal,
            }
          }
          Order.create(newOrder)
          .then(order => {
            Order.findById(order._id)
            .populate({
              path: 'user', 
              populate: { path: 'entity' }
            })
            .populate({
              path: 'products.product'
            })
            .lean()
            .exec((error, theOrder) => {
              sendGrid.sendNewOrderEmail(process.env.FROM_EMAIL, theOrder.user.username, theOrder)
              .then(email => {
                Cart.findByIdAndRemove(id)
                .then(response => {
                  res.send({status:200, order})
                })
              })
              .catch(err => {
                console.log(err)
              })
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
      }
    })
});

router.delete('/:id', (req, res, next) => {
  let { id } = req.body.data;
  Order.findById(id)
  .then(order => {
    removeTheStock(order.products)
    .then(updatedProducts => {
      Order.findByIdAndRemove(id)
      .then(response => {
        res.send({status: 200, message: 'Se ha eliminado correctamente!'})
      })
    })
  })
  .catch(error => {
    console.log(error)
  })
})

module.exports = router;