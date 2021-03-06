const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  ref: Number, //referencia del producto
  titulo: String, //titulo del producto
  foto: {
    type: String,
    default: ['https://res.cloudinary.com/acompartirapp/image/upload/v1567091138/images/product/default_jgxej7.svg']
  }, //imagen del producto
  descripcionCorta: String, //descripción corta del producto
  descripcion: String, //descripción larga del producto
  categoria: { type: String, enum: ['Higiene', 'Limpieza', 'Hogar', 'Electrodomésticos', 'Bebés', 'Ropa', 'Material Escolar', 'Oficina', 'Otros']}, //categoría del producto
  cajasPorPalet: Number,
  presentacion: {type: String, enum: ['Caja', 'Palet']},
  stock: Number,
  unidadesPorCaja: Number,
  totalCantidad: {type: Number, default: 1}, //cantidad total del producto. Multiplicación de los últimos 2 campos
  maxCantidad: {type: String, default: 100}, //cantidad máxima en un pedido
  minCantidad: {type: String, default: 0}, //cantidad de cajas o palets en existencia
  precioOriginal: Number, //precio de mercado
  precioOriginalTotal: Number, //precio de mercado
  porcentajeAcompartir: Number, //participación acompartir %
  precioAcompartir: Number, //participación acompartir
  company: String, //compañía donante
  showCompany: {type: Boolean, default: true}, //mostrar o no compañía donante
  demandaAlta: Boolean, //alta demanda del producto
  pesoPorCaja: Number, //peso de la caja o palet
  mostrar: {type: Boolean, default: false} //mostrar o no el producto
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;