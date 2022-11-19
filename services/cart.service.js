const boom = require('@hapi/boom');
const Model = require('../models/cart.model');

class CartsService {

  constructor() {}

  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

    //Consigue el carrito por su id
    async getById(id){
      const cart = await Model.findOne({
        _id: id,
      });
      if (cart == undefined || cart == null)
        throw boom.notFound('No se encontro el carrito');
      else if (cart.length <= 0)
        throw boom.notFound('No se encontro ningún registro');
      return cart;
    }

    //Consigue el carrito por su id
    async getByUserId(userid){
      const cart = await Model.findOne({
        userid: userid,
      });
      if (cart == undefined || cart == null)
        throw boom.notFound('No se encontro el carrito');
      else if (cart.length <= 0)
        throw boom.notFound('No se encontro ningún registro');
      return cart;
    }

  //Modificar carrito
  async updateCart(userid, changes) {
    let cart = await Model.findOne({
      userid: userid,
    });
    if (cart == undefined || cart == null)
      throw boom.notFound('No se encontro el usuario');
    else if (cart.length <= 0)
      throw boom.notFound('No se encontro ningún registro');

    let cartOriginal = {
      products: cart.products
    };

    const { products } = changes;
    cart.products = products;

    cart.save();

    return {
      original: cartOriginal,
      actualizado: cart,
    };
  }

  //No se ocupara, solo por motivos de testeo
  async getAll(limit){
    let response = {};

    let cartsDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['cart'] = limit
      ? cartsDB.filter((item, index) => item && index < limit)
      : cartsDB;

    return response;
  }

}

module.exports = CartsService;
