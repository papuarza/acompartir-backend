const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['owner', 'entity_admin', 'entity_worker', 'editor', 'admin', 'client', 'company']
  },
  name: String,
  lastName: String,
  phone: String,
  birthdate: Date,
  entity: { type: Schema.Types.ObjectId, ref: 'Entity'}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
