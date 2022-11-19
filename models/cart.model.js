const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const cartSchema = new Schema({
  id: mongoose.Types.ObjectId,
  userid: mongoose.Types.ObjectId,
  products: Array
});
const model = mongoose.model('cart', cartSchema);
module.exports = model;
