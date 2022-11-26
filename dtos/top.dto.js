const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id    = Joi.string();
const views = Joi.number();

const createTopProductDto = Joi.object({
  id:         id.required(),
  views:      views.required(),
});

module.exports = {
  createTopProductDto,
};
