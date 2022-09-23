const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id          = Joi.string();
const initDate    = Joi.string();
const endDate     = Joi.string();
const mostSellProd= Joi.string();
const mostSellCat = Joi.string();
const idCategory  = Joi.string();
const idUser      = Joi.string();
const totalPrice  = Joi.number().integer().min(10);
const isActive =    Joi.boolean();

const createReportDate = Joi.object({
  initDate:     initDate.required(),
  endDate:      endDate.required(),
  mostSellProd: mostSellProd.required(),
  mostSellCat:  mostSellCat.required(),
  totalPrice:   totalPrice.required(),
  isActive:     isActive.required(),
});

const createReportCat = Joi.object({
  idCategory:   idCategory.required(),
  mostSellProd: mostSellProd.required(),
  totalPrice:   totalPrice.required(),
  isActive:     isActive.required(),
});

const createReportUser = Joi.object({
  idUser:       idUser.required(),
  mostSellProd: mostSellProd.required(),
  mostSellCat:  mostSellCat.required(),
  totalPrice:   totalPrice.required(),
  isActive:     isActive.required(),
});

const createReportGral = Joi.object({
  mostSellProd: mostSellProd.required(),
  mostSellCat:  mostSellCat.required(),
  totalPrice:   totalPrice.required(),
  isActive:     isActive.required(),
});

const getReportId = Joi.object({
  id: id.required(),
});

module.exports = {
  createReportDate,
  createReportCat,
  createReportUser,
  createReportGral,
  getReportId
};
