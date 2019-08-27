const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const donacionSchema = new Schema({
  nombre: String,
  apellido: String,
  movil: String,
  email: String,
  monto: Number,
  entidad: { type: Schema.Types.ObjectId, ref: 'Entidad'},
  status: {type: String, enum: ['Pendiente de Pago', 'Recibida'], default: 'Pendiente de Pago'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Donacion = mongoose.model('Donacion', donacionSchema);
module.exports = Donacion;