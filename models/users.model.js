const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//MODELO DE LA BD
const usersSchema = new Schema({
  id: mongoose.Types.ObjectId,
  isActive: Boolean,
  username: String,
  password: String,
  email: {type: String, unique: true},
  role: {
    type: ["user", "admin"],
    default: "user",
  },  phone: String,
  image: String
});
const model = mongoose.model('users', usersSchema);
module.exports = model;
