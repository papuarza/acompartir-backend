const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const entitySchema = new Schema({
  cif: String,
  type: {
    type: String,
    default: 'ONG',
    enum: ['ONG', 'Economatos']
  },
  name: String,
  fecha_constitución: Date,
  voluntarios: Number,
  empleados: Number,
  personas_atendidas: Number,
  actividad_centro: {
    type: String
  },
  colections: [{
    type: String
  }],
  numero_registro: 'String',
  direcciones_envio: [],
  direcciones_facturacion: [],
  documentos: {
	  estatutos: { url: String, fecha: Date},
	  memorias: { url: String, fecha: Date},
	  ficha: { url: String, fecha: Date}
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
