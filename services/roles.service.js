// const faker = require('faker');
const boom = require('@hapi/boom');
// const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
const Model = require('../models/roles.model');

class RolesService {

  constructor() {}

  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async getAll(limit){
    let response = {};
    let rolesDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['roles'] = limit
      ? rolesDB.filter((item, index) => item && index < limit)
      : rolesDB;

    return response;
  }

  async getById(id){
    const rol = await Model.findOne({
      id: id,
    });

    if (rol == undefined || rol == null)
      throw boom.notFound('No se encontro el rol');
    else if (rol.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

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
    let rol = await Model.findOne({
      id: id,
    });

    const { deletedCount } = await Model.deleteOne({
      id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');

    return rol;
  }


}


module.exports = RolesService;
