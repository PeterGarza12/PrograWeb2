// const faker = require('faker');
const boom = require('@hapi/boom');
// const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
const Model = require('../models/categorias.model');
class CategoriasService {

  constructor() {
    this.categorias = [];
    this.generate();
  }

  // generate() {
  //   const limit = 3;
  //   for (let index = 0; index < limit; index++) {
  //     this.categorias.push({
  //       id: faker.datatype.uuid(),
  //       name: faker.commerce.productName(),
  //     });
  //   }
  // }

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

  getAll(limit){
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

    if (product == undefined || categoria == null)
      throw boom.notFound('No se encontro el producto');
    else if (product.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return product;
  }


  async delete(id) {
    const index = this.categorias.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Categoría no encontrada');
    }
    this.categorias.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }

}

module.exports = CategoriasService;
