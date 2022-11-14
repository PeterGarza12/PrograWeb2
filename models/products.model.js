const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const productsSchema = new Schema({
  id          : Number,
  name        : String,
  description : String,
  idCategory  : Number,
  image       : String,
  price       : Number,
  rate        : Number,
  isActive    : Boolean
});
const model = mongoose.model('products', productsSchema);
module.exports = model;
