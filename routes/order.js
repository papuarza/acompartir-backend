const express = require('express');
const router  = express.Router();
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const Cart = require('../models/Cart.js');
const Order = require('../models/Order.js');

router.post('/', (req, res, next) => {
  
});

module.exports = router;