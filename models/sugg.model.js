const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const suggSchema = new Schema({
  id: mongoose.Types.ObjectId,
  idCategory: String,
  idUser: mongoose.Types.ObjectId
});
const model = mongoose.model('suggestions', suggSchema);
module.exports = model;
