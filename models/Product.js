const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  ref: Number, //referencia del producto
  titulo: String, //titulo del producto
  foto: {
    type: String,
    default: ['../../assets/images/product/default.svg']
  }, //imagen del producto
  descripcionCorta: String, //descripción corta del producto
  descripcion: String, //descripción larga del producto
  categoria: { type: Schema.Types.ObjectId, ref: 'Category' }, //categoría del producto
  subCategoria: String, //subcategoría del producto
  presentacion: String, //caja o palet
  packCantidad: {type: Number, default: 1}, //cantidad de cajas o palets en existencia
  unidadPackCantidad: {type: Number, default: 1}, //cantidad de unidades por caja o palet
  totalCantidad: {type: Number, default: 1}, //cantidad total del producto. Multiplicación de los últimos 2 campos
  maxCantidad: {type: String, default: 100}, //cantidad máxima en un pedido
  minCantidad: {type: String, default: 0}, //cantidad de cajas o palets en existencia
  precioOriginal: Number, //precio de mercado
  porcentajeAcompartir: Number, //participación acompartir %
  precioAcompartir: Number, //participación acompartir
  company: String, //compañía donante
  showCompany: Boolean, //mostrar o no compañía donante
  demandaAlta: Boolean, //alta demanda del producto
  peso: Number, //peso de la caja o palet
  boxPalets: Number, //cantidad de cajas o palets por palet
  mostrar: {type: Boolean, default: false} //mostrar o no el producto
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
