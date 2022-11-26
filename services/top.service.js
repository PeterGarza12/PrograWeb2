const boom = require('@hapi/boom');
const Model = require('../models/top.model');

class TopProductService {

  constructor() {}

  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async getAll(limit) {
    let response = {};
    let productsDB = await Model.find().sort({views: -1});
    //productsDB.sort({views: 1});

    //Obtenemos solo la cantidad deseada de registros
    response['topProducts'] = limit
      ? productsDB.filter((item, index) => item && index < limit)
      : productsDB;

    return response;
  }

    //Modificar un producto mediante su id
  async update(id) {
    let product = await Model.findOne({
      id: id,
    });
    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el usuario');
    else if (product.length <= 0)
      throw boom.notFound('No se encontro ningún registro');

    product.views++;

    product.save();

    return {
      actualizado: product,
    };
  }

}

module.exports = TopProductService;
