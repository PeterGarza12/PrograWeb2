const Joi = require('joi');

const id = Joi.string();
const userid = Joi.string();
const products = Joi.array();

const createCartDto = Joi.object({
  userid: userid.required(),
});

const updateCartDto = Joi.object({
  products: products,
});

const getCartByIdDto = Joi.object({
  id: id.required(),
});

const getCartByUserIdDto = Joi.object({
  userid: userid.required(),
});

module.exports = {
  createCartDto,
  updateCartDto,
  getCartByIdDto,
  getCartByUserIdDto,
};
