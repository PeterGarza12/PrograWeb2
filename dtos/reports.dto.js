const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
//const id          = Joi.string();
const idUser      = Joi.string();
const totalSales  = Joi.number();
const email       = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const totalPrice  = Joi.number();
const date        = Joi.string();

const createReportUser = Joi.object({
  idUser:       idUser.required(),
  totalSales:   totalSales.required(),
  email:        email.required(),
  totalPrice:   totalPrice.required(),
  date:         date.required(),
});

const getReportEmail = Joi.object({
  email: email.required(),
});

module.exports = {
  createReportUser,
  getReportEmail
};
