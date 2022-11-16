const Joi = require('joi');

const id = Joi.number().integer();
const isActive = Joi.boolean();
const name = Joi.string().min(3).max(50);

const createRolesDto = Joi.object({
  id: id.required(),
  name: name.required(),
  isActive: isActive.required()
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
