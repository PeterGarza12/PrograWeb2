const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id =          Joi.number().integer();
const name =        Joi.string().min(3).max(50);
const description = Joi.string().min(10).max(100);
const idCategory =  Joi.number().integer();
const image =       Joi.string();
const price =       Joi.number().integer().min(10);
const rate =        Joi.number();
const isActive =    Joi.boolean();

const createProductDto = Joi.object({
  id:           id.required(),
  name:         name.required(),
  description:  description.required(),
  idCategory:   idCategory.required(),
  image:        image.required(),
  price:        price.required(),
  rate:         rate.required(),
  isActive:     isActive.required(),
});

const updateProductDto = Joi.object({
  name:         name,
  description:  description,
  idCategory:   idCategory,
  image:        image,
  price:        price,
  rate:         rate,
  isActive:     isActive,
});

const getProductId = Joi.object({
  id: id.required(),
});

const getProductCategory = Joi.object({
  idCategory: idCategory.required(),
});

const getProductName = Joi.object({
  name: name.required(),
});

module.exports = {
  createProductDto,
  updateProductDto,
  getProductId,
  getProductCategory,
  getProductName
};
