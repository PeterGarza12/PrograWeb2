const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const topProductsSchema = new Schema({
  id   : String,
  views: Number
});
const model = mongoose.model('topProducts', topProductsSchema);
module.exports = model;
