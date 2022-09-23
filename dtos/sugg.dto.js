const Joi = require('joi');

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const id =          Joi.string();
const idCategory =  Joi.string();
const idUser =      Joi.string();

const createSuggestion = Joi.object({
  idCategory:   idCategory.required(),
  idUser:       idUser.required(),
});

const updateSuggestion = Joi.object({
  idCategory:   idCategory
});

const getSuggestionById = Joi.object({
  id: id.required(),
});

const getSuggestionByUser = Joi.object({
  idUser: idUser.required(),
});


module.exports = {
  createSuggestion,
  updateSuggestion,
  getSuggestionById,
  getSuggestionByUser
};
