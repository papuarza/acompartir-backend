const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const mediaSchema = new Schema({
  title: String,
  link: String,
  type: {
    type: String,
    enum: ['Radio', 'Televisión', 'Prensa', 'Web', 'Informe']
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;