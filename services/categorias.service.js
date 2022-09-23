const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class CategoriasService {

  constructor() {
    this.categorias = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.categorias.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
      });
    }
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.categorias.push(newCategory);
    return newCategory;
  }

  async update(id, changes) {
    const index = this.categorias.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Categoria no encontrada');


    var currentCategory = this.categorias[index];
    this.categorias[index] = {
      ...currentCategory,
      ...changes,
    };
    return this.categorias[index];
  }

  getAll(limit){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        var categorias = this.categorias.slice(0, limit);
        if(categorias.length>0){
          resolve(categorias);
        }
        else{
          rejected('No se encontraron categorías');
        }
      }, 5000);
    });
  }

  async getById(id){
    const categoria = this.categorias.find((item) => item.id === id);

    validateData(categoria, NOTFOUND, 'No encontrado',          (data) => !data);
    validateData(categoria, CONFLICT, 'La categoría no esta activa',  (data) => data.isActive == false);
    return categoria;
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
