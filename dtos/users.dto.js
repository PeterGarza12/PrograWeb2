const Joi = require('joi');

const id = Joi.string(); //automatico, cambiar despues dependiendo del tipo de id que se use
const isActive = Joi.boolean(); //siempre se creara en true desde la base
const username = Joi.string().min(3).max(50);
// eslint-disable-next-line no-useless-escape
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9\-_]{8}$'));
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const role = Joi.array();
const phone = Joi.string().min(10).max(10);

const createUserDto = Joi.object({
  isActive: isActive.required(),
  username: username.required(),
  password: password.required(),
  email: email.required(),
  role: role.required(),
  phone: phone.required(),
});

const getUserIdDto = Joi.object({
  id: id.required(),
});

const LoginDto = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserDto = Joi.object({
  username: username,
  password: password,
  phone: phone,
});

module.exports = {
  createUserDto,
  getUserIdDto,
  updateUserDto,
  LoginDto
}

//var reg_ex = /^((?=.*[A-Z])(?=.*\d)(?=.*[~@#%$^*”’_+=¿?¡!()\[\]{};:*,.-])(?!.* )).{8}$/;

