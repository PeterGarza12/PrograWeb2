const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const rolesSchema = new Schema({
  id          : Number,
  isActive    : Boolean,
  name        : String,
});
const model = mongoose.model('roles', rolesSchema);
module.exports = model;
