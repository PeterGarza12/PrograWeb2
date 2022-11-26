const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const reportsUserSchema = new Schema({
  id          : mongoose.Types.ObjectId,
  idUser      : String,
  email       : String,
  totalSales  : Number,
  totalPrice  : Number,
  date        : String
});
const model = mongoose.model('reportsUser', reportsUserSchema);
module.exports = model;
