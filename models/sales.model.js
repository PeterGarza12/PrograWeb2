const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const salesSchema = new Schema({
  id: mongoose.Types.ObjectId,
  userid: mongoose.Types.ObjectId,
  productid: mongoose.Types.ObjectId,
  price: Number,
  date: Date
});
const model = mongoose.model('sales', salesSchema);
module.exports = model;
