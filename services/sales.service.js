const boom = require('@hapi/boom');
const Model = require('../models/sales.model');

class SalesService {

  constructor() {}

  //Crea nueva compra
  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  //Consigue todas las compras en general
  async getAll(limit){
    let response = {};

    let salesDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['sales'] = limit
      ? salesDB.filter((item, index) => item && index < limit)
      : salesDB;

    return response;
  }

  //Consigue una compra por su id
  async getById(id){
    const sales = await Model.findOne({
      _id: id,
    });
    if (sales == undefined || sales == null)
      throw boom.notFound('No se encontro el registro de compra');
    else if (sales.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return sales;
  }

  //Consigue las compras por el id del usuario que realizo la compra
  async getByUserId(userid) {
    const sales = await Model.find({
      userid: userid,
    });
    if (sales == undefined || sales == null)
      throw boom.notFound('No se encontro el registro de compra');
    else if (sales.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return sales;
  }

  async getByUserEmail(email) {
    const sales = await Model.find({
      email: email,
    });
    if (sales == undefined || sales == null)
      throw boom.notFound('No se encontro el registro de compra');
    else if (sales.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return sales;
  }

  //Elimina un registro de compra
  async delete(id) {
    let sales = await Model.findOne({
      _id: id,
    });

    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro a eliminar no existe');

    return sales;
  }

}
module.exports = SalesService;
