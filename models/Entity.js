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
    default: 'http://www.14riverside.com/wp-content/uploads/2015/12/placeholder-company.png'
  },
  telefono: String,
  movil: String,
  email: String,
  web: String,
  comentarios: String,
  personaContacto: String,
  razonSocial: String,
  fechaConstitucion: {type: Date},
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
