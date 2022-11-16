const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const categoriasSchema = new Schema({
  id          : Number,
  name        : String,
});
const model = mongoose.model('categorias', categoriasSchema);
module.exports = model;
