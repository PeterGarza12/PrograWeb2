const boom = require('@hapi/boom');
const Model = require('../models/reports.model');

class ReportService {

  constructor(){}

  //Crear reportes (llega la data según lo que mande el router)
  async create(data){
    const model = new Model(data);
    await model.save();
    return data;
  }

  //Mostrar todos los reportes
  async getAll(limit){
    let response = {};
    let reportsDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['reports'] = limit
      ? reportsDB.filter((item, index) => item && index < limit)
      : reportsDB;

    return response;
  }

  //Mostrar el reporte que quieras mediante su id
  async getReportById(id){
    const product = await Model.findOne({
      _id: id,
    });

    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el producto');
    else if (product.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return product;
  }

}

module.exports = ReportService;
