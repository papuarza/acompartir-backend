const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
  products:[ 
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product'},
      qty: {type: Number, default: 0}
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  payment: {type: String},
  deliver: {type: String, enum: ['Recogida', 'Entrega']},
  status: {type: String, enum: ['Pendiente Pago', 'En Preparación', 'En Reparto', 'Entregao', 'Cancelado']}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;