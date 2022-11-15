const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const reportsCategorySchema = new Schema({
  id          : mongoose.Types.ObjectId,
  idCategory  : String,
  mostSellProd: String,
  totalPrice  : Number,
  isActive    : Boolean
});
const model = mongoose.model('reportsCategory', reportsCategorySchema);
module.exports = model;
