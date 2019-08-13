const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const entitySchema = new Schema({
  cif: String,
  tipo: {
    type: String,
    default: 'ONG',
    enum: ['ONG', 'Economatos']
  },
  direccion: {
    principal: String,
    ciudad: String,
    provincia: String,
    codigoPostal: String,
  },
  telefono: String,
  movil: String,
  email: String,
  web: String,
  comentarios: String,
  personaContacto: String,
  razonSocial: String,
  fechaConstitución: Date,
  voluntarios: Number,
  empleados: Number,
  personasAtendidas: Number,
  actividadCentro: {
    type: String
  },
  colectivos: [{
    type: String
  }],
  numeroRegistro: 'String',
  direcciones_envio: [],
  direcciones_facturacion: [],
  documentos: {
	  estatutos: { url: String, fecha: Date},
	  memorias: { url: String, fecha: Date},
	  ficha: { url: String, fecha: Date}
  },
  active: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
