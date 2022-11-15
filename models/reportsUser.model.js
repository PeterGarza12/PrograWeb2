const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const reportsUserSchema = new Schema({
  id          : mongoose.Types.ObjectId,
  idUser      : String,
  mostSellProd: String,
  mostSellCat : String,
  totalPrice  : Number,
  isActive    : Boolean
});
const model = mongoose.model('reportsUser', reportsUserSchema);
module.exports = model;
