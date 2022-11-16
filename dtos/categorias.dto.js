const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);

const createCategoriasDto = Joi.object({
  id: id.required(),
  name: name.required(),
});


const getCategoriasIdDto = Joi.object({
  id: id.required(),
});

module.exports = {
  createCategoriasDto,
  getCategoriasIdDto,
};
