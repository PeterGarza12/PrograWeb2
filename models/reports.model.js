const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const reportsSchema = new Schema({
  id          : mongoose.Types.ObjectId,
  initDate    : String,
  endDate     : String,
  mostSellProd: String,
  mostSellCat : String,
  idCategory  : String,
  idUser      : String,
  totalPrice  : Number,
  isActive    : Boolean
});
const model = mongoose.model('reports', reportsSchema);
module.exports = model;
