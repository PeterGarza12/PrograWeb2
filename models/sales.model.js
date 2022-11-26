const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const salesSchema = new Schema({
  id: mongoose.Types.ObjectId,
  userid: mongoose.Types.ObjectId,
  email: String,
  products: Array,
  price: Number,
  date: Date
});
const model = mongoose.model('sales', salesSchema);
module.exports = model;
