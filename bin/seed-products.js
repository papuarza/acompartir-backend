require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const products = [
 {
  category: '5bfce66d36db0a3afa601321',
  title: 'Papel higienico (108 rollos)',
  photos: ['http://www.acompartir.es/1899-large_default/palt-champus-.jpg'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a ex vel mauris facilisis dapibus vel id mauris. Cras hendrerit nisl ac mi porta eleifend. Nunc eget convallis leo, vitae blandit diam.',
  size: 1/26,
  unit_price: 2,
  original_price: 100,
  presentation: 'Saco de 9 paquetes de 12 rollos cada uno.',
  company: 'Amazon',
  show_company: true,
  stock: 100,
  high_demand: false,
  peso: 6.8,
 },
 {
  category: '5bfce66d36db0a3afa601321',
  title: 'Jabón manos niños 500ml (15 uds)',
  photos: ['http://www.acompartir.es/1883-large_default/gel-familiar-frescor-azul-1000ml-560-uds.jpg'],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a ex vel mauris facilisis dapibus vel id mauris. Cras hendrerit nisl ac mi porta eleifend. Nunc eget convallis leo, vitae blandit diam.',
  size: 1/11,
  unit_price: 8,
  original_price: 983,
  presentation: 'Falta descripción',
  company: 'Amazon',
  show_company: true,
  stock: 100,
  high_demand: true,
  peso: 8.5,
 },
 {
  category: '5bfce66d36db0a3afa601329',
  title: 'Peluches Mickey (8 uds)',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a ex vel mauris facilisis dapibus vel id mauris. Cras hendrerit nisl ac mi porta eleifend. Nunc eget convallis leo, vitae blandit diam.',
  size: 1/47,
  unit_price: 2,
  original_price: 49,
  presentation: '45cm alto x 17cm ancho x 18cm profundidad',
  company: 'Unilever',
  show_company: false,
  stock: 100,
  high_demand: false,
  peso: 2,
 },
 {
  category: '5bfce66d36db0a3afa601322',
  title: 'Fregasuelos 500ml (12 uds)',
  description: 'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',
  size: 1/23,
  unit_price: 0.5,
  original_price: 81,
  presentation: 'No hay más información',
  company: 'Unilever',
  show_company: false,
  stock: 100,
  high_demand: true,
  peso: 6,
 },
 {
  category: '5bfce66d36db0a3afa601323',
  title: 'Vasos carton 120ml (1.000 uds)',
  description: 'Por favor, tened en cuenta que tanto las cantidades indicadas en la descripción del producto como el color y el tamaño que aparece en la imagen del catálogo online pueden variar.',
  size: 1/9,
  unit_price: 3,
  original_price: 119,
  presentation: 'No hay más información',
  company: 'Otra empresa',
  show_company: false,
  stock: 100,
  high_demand: true,
  peso: 10.6,
 },
]

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    mongoose.connection.db.dropCollection('products');
    Product.create(products)
    .then(products => {
      products.forEach(product => {
        console.log(`${product.title} ha sido creado!`)
      })
      mongoose.connection.close();
    })
    .catch(error => {
      console.log(error)
    })
  })
  .catch(error => {
    console.log(error)
  })