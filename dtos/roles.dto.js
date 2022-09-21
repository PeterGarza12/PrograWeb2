const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id = Joi.number();
const isActive = Joi.boolean();
const name = Joi.string().min(3).max(50);

const createRolesDto = Joi.object({
  name: name.required(),
});

const updateRolesDto = Joi.object({
  isActive: isActive,
  name: name,
});

const getRolesIdDto = Joi.object({
  id: id.required(),
});

module.exports = {
  createRolesDto,
  updateRolesDto,
  getRolesIdDto,
};
