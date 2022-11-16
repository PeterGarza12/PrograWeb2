// const faker = require('faker');
const boom = require('@hapi/boom');
// const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
const Model = require('../models/categories.model');
class CategoriasService {

  constructor() {}

  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }
  // async update(id, changes) {
  //   const index = this.categorias.findIndex((item) => item.id === id);

  //   if (index === -1) throw boom.notFound('Categoria no encontrada');


  //   var currentCategory = this.categorias[index];
  //   this.categorias[index] = {
  //     ...currentCategory,
  //     ...changes,
  //   };
  //   return this.categorias[index];
  // }

  async getAll(limit){
    let response = {};
    let categoriasDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['categorias'] = limit
      ? categoriasDB.filter((item, index) => item && index < limit)
      : categoriasDB;

    return response;
  }

  async getById(id){
    const categoria = await Model.findOne({
      id: id,
    });

    if (categoria == undefined || categoria == null)
      throw boom.notFound('No se encontro la categoria');
    else if (categoria.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return categoria;
  }


  async delete(id) {
    let category = await Model.findOne({
      id: id,
    });

    const { deletedCategory } = await Model.deleteOne({
      id: id,
    });
    if (deletedCategory <= 0)
      throw boom.notFound('El registro seleccionado no existe');

    return category;
  }

}

module.exports = CategoriasService;
