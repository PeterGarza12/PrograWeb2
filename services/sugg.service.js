const boom = require('@hapi/boom');
const Model = require('../models/sugg.model');


class SuggestionService {

  constructor(){}

  //Crear sugerencia
  async create(data) {
      const model = new Model(data);
      await model.save();
      return data;
  }

  //Traer todas las sugerencias
  async getAll(limit) {
    let response = {};

    let suggDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['suggestions'] = limit
      ? suggDB.filter((item, index) => item && index < limit)
      : suggDB;

    return response;
  }

  //Encontrar sugerencia mediante el id de la misma
  async getSuggestionById(id) {

    const sugg = await Model.findOne({
      _id: id,
    });
    if (sugg == undefined || sugg == null)
      throw boom.notFound('No se encontro el registro');
    else if (sugg.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return sugg;
  }

  //Encontrar sugerencia mediante el id del usuario
  async getSuggestionByIdUser(idUser) {

    const sugg = await Model.findOne({
      idUser: idUser,
    });
    if (sugg == undefined || sugg == null)
      throw boom.notFound('No se encontro el registro');
    else if (sugg.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return sugg;
  }

  //Modificar parcialmente una sugerencia mediante id del usuario
  async update(idUser, changes) {
    let sugg = await Model.findOne({
      idUser: idUser,
    });
    if (sugg == undefined || sugg == null)
      throw boom.notFound('No se encontro el registro');
    else if (sugg.length <= 0)
      throw boom.notFound('No se encontro ningún registro');

    let suggOriginal = {
      idCategory: sugg.idCategory
    };

    const { idCategory } = changes;
    sugg.idCategory = idCategory;

    sugg.save();

    return {
      original: suggOriginal,
      actualizado: sugg,
    };
  }

}


module.exports = SuggestionService;
