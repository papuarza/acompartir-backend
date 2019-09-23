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
  payment: {type: String, enum:['Tarjeta Crédito/Débito', 'Paypal', 'Transferencia Bancaria']},
  deliver: {type: String, enum: ['Recogida', 'Entrega']},
  status: {type: String, default: 'En espera de recibir transferencia bancaria', enum: ['Pendiente Aprobación', 'Transferencia recibida', 'Transferido a almacen', 'Transferido a transporte', 'En espera de recibir transferencia bancaria', 'Entregado', 'Cancelado']},
  personasBeneficiadas: {type: Number},
  colectivos: [{type: String}],
  consumoPropio: {type: Boolean, default: false},
  reparto: {type: Boolean, default: false},
  deliverAddress: {
    principal: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
