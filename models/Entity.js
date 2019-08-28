const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const entitySchema = new Schema({
  cif: String,
  ref: Number,
  nombre: String,
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
  logo: {
    type: String,
    default: 'assets/images/team.svg'
  },
  telefono: String,
  movil: String,
  email: String,
  web: String,
  comentarios: String,
  personaContacto: String,
  razonSocial: String,
  fechaConstitucion: {type: Date},
  fechaAlta: {type: String},
  voluntarios: Number,
  empleados: Number,
  beneficiarios: String,
  beneficiariosTotales: String,
  actividadCentro: {
    type: String
  },
  colectivos: [{
    type: String
  }],
  numeroRegistro: 'String',
  direcciones_envio: [
    {
        principal: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String,
    }
  ],
  direccion_facturacion:
    {
        principal: String,
        ciudad: String,
        provincia: String,
        codigoPostal: String,
    },
  documentos: {
	  estatutos: { url: String, fecha: Date},
	  memorias: { url: String, fecha: Date},
	  ficha: { url: String, fecha: Date}
  },
  active: {
    type: Boolean,
    default: true
  },
  newsletter: {
    type: Boolean,
    default: true
  },
  firtsTime: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Entity = mongoose.model('Entity', entitySchema);
module.exports = Entity;
