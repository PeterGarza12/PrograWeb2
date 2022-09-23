const Joi = require('joi');

const id = Joi.string(); //automatico, cambiar despues dependiendo del tipo de id que se use
const userid = Joi.string();
const productid = Joi.string();
const price = Joi.number().integer().min(10);
const date = Joi.date();

const createSaleDto = Joi.object({
  userid: userid.required(),
  productid: productid.required(),
  price: price.required(),
  date: date.required(),
});

const getSaleByIdDto = Joi.object({
  id: id.required(),
});

const getSaleByUserIdDto = Joi.object({
  userid: userid.required(),
});

module.exports = {
  createSaleDto,
  getSaleByIdDto,
  getSaleByUserIdDto,
}
