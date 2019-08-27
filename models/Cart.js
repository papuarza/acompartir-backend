const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cartSchema = new Schema({
  products:[ 
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product'},
      qty: {type: Number, default: 0}
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  deliver: {type: String, enum: ['Recogida', 'Entrega']}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;