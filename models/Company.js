const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const companySchema = new Schema({
  photo: String,
  name: String,
  home: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
