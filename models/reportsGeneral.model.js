const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const reportsGeneralSchema = new Schema({
  id          : mongoose.Types.ObjectId,
  mostSellProd: String,
  mostSellCat : String,
  totalPrice  : Number,
  isActive    : Boolean
});
const model = mongoose.model('reportsGeneral', reportsGeneralSchema);
module.exports = model;
