const Joi = require('joi');

const id = Joi.string(); //automatico, cambiar despues dependiendo del tipo de id que se use
const isActive = Joi.boolean(); //siempre se creara en true desde la base
const username = Joi.string().min(3).max(50);
// eslint-disable-next-line no-useless-escape
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9\-_]{8}$'));
const email = Joi.string().email();
const role = Joi.number().integer();
const phone = Joi.string().min(10).max(10);
const image = Joi.string();

const createUserDto = Joi.object({
  isActive: isActive,
  username: username.required(),
  password: password.required(),
  email: email.required(),
  role: role.required(),
  phone: phone.required(),
  image: image.required(),
});

const getUserIdDto = Joi.object({
  id: id.required(),
});

const updateUserDto = Joi.object({
  isActive: isActive,
  username: username,
  password: password,
  email: email,
  role: role,
  phone: phone,
  image: image,
});

module.exports = {
  createUserDto,
  getUserIdDto,
  updateUserDto,
}

//var reg_ex = /^((?=.*[A-Z])(?=.*\d)(?=.*[~@#%$^*”’_+=¿?¡!()\[\]{};:*,.-])(?!.* )).{8}$/;

