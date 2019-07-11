require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category.js');
const dbName = process.env.MONGODB_URI;

mongoose.Promise = Promise;

const categories = [
  {
    title: 'Higiene y Bienestar',
    subCategories: [],
    query: 'higiene-bienestar'
  },
  {
    title: 'Limpieza',
    subCategories: [],
    query: 'limpieza'
  },
  {
    title: 'Hogar',
    subCategories: ['Cocina', 'Dormitorio', 'Baño'],
    query: 'hogar'
  },
  {
    title: 'Electrodomésticos',
    subCategories: [],
    query: 'electrodomesticos'
  },
  {
    title: 'Bebés',
    subCategories: [],
    query: 'bebes'
  },
  {
    title: 'Ropa y Calzado',
    subCategories: ['Niños', 'Mujer', 'Hombre'],
    query: 'ropa-calzado'
  },
  {
    title: 'Material Escolar',
    subCategories: [],
    query: 'material-escolar'
  },
  {
    title: 'Oficina',
    subCategories: [],
    query: 'oficina'
  },
  {
    title: 'Otros',
    subCategories: [],
    query: 'otros'
  },
]

mongoose.connect(dbName, { useMongoClient: true })
  .then(() => {
    mongoose.connection.db.dropCollection('categories');
    Category.create(categories)
    .then(categories => {
      categories.forEach(category => {
        console.log(`${category.title} ha sido creado!`)
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