const Joi = require('joi');

const id = Joi.string(); //automatico, cambiar despues dependiendo del tipo de id que se use
const userid = Joi.string();
const products = Joi.array();
const price = Joi.number();
const date = Joi.date();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

const createSaleDto = Joi.object({
  userid: userid.required(),
  email: email.required(),
  products: products.required(),
  price: price.required(),
  date: date.required(),
});

const getSaleByIdDto = Joi.object({
  id: id.required(),
});

const getSaleByUserEmailDto = Joi.object({
  email: email.required(),
});

const getSaleByUserIdDto = Joi.object({
  userid: userid.required(),
});

module.exports = {
  createSaleDto,
  getSaleByIdDto,
  getSaleByUserIdDto,
  getSaleByUserEmailDto
}
