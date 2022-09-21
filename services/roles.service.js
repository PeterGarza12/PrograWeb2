const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class RolesService {

  constructor() {
    this.roles = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.roles.push({
        isActive: true,
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
      });
    }
  }

  async create(data) {
    const newRole = {
      isActive: true,
      id: faker.datatype.number(),
      ...data,
    };
    this.roles.push(newRole);
    return newRole;
  }

  update(){

  }

  getAll(limit){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        var roles = this.roles.slice(0, limit);
        if(roles.length>0){
          resolve(roles);
        }
        else{
          rejected('');
        }
      }, 5000);
    });
  }

  async getById(id){
    const rol = this.roles.find((item) => item.id === id);

    validateData(rol, NOTFOUND, 'No encontrado',          (data) => !data);
    validateData(rol, CONFLICT, 'El rol no está activo',  (data) => data.isActive == false);
    return rol;
  }

  getActive(){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        const rol = this.roles.filter((item)=>item.isActive === true);
        if(rol.length>0){
          resolve(rol);
        }
        else{
          rejected('No hay activos');
        }
      },2000);
    });
  }

  async delete(id) {
    const index = this.roles.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.roles.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }

}

module.exports = RolesService;
