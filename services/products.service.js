//const faker = require('faker');
const boom = require('@hapi/boom');
const Model = require('../models/products.model');
//const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class ProductService {

  constructor() {}

  async create(data) {
    const model = new Model(data);
    await model.save();
    return data;
  }

  async getAll(limit) {
    let response = {};
    let productsDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['products'] = limit
      ? productsDB.filter((item, index) => item && index < limit)
      : productsDB;

    return response;
  }

  // findActiveProducts() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const activeProducts = this.products.filter((x) => x.isActive === true);
  //       resolve(activeProducts);
  //     }, 2000);
  //   });
  // }

  //Encontrar mediante el id del producto
  async getProductById(id) {
    const product = await Model.findOne({
      id: id,
    });

    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el producto');
    else if (product.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return product;
  }

  //Encontrar todos los productos de la categoría que se pida
  async getProductByCategory(idCat) {
    const product = await Model.find({
      idCat: idCat
    });


    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el producto');
    else if (product.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return product;
  }

  //Encontrar mediante el nombre del producto
  async getProductByName(name) {
    const product = await Model.findOne({
      name: name,
    });

    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el producto');
    else if (product.length <= 0)
        throw boom.notFound('No se encontro ningún registro');

    return product;
  }

    //Modificar un producto mediante su id
  async update(id, changes) {
    let product = await Model.findOne({
      id: id,
    });
    if (product == undefined || product == null)
      throw boom.notFound('No se encontro el usuario');
    else if (product.length <= 0)
      throw boom.notFound('No se encontro ningún registro');

    let productOriginal = {
      id          : product.id,
      name        : product.name,
      description : product.description,
      idCategory  : product.idCategory,
      image       : product.image,
      price       : product.price,
      rate        : product.rate,
      isActive    : product.isActive
    };

    const { name, description, idCategory, image, price, rate, isActive } = changes;
    product.name = name;
    product.description = description;
    product.idCategory = idCategory;
    product.image = image;
    product.price = price;
    product.rate = rate;
    product.isActive = isActive;

    product.save();

    return {
      original: productOriginal,
      actualizado: product,
    };
  }

  //Modificar completamente un producto mediante su id
  async updateComplete(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentProduct = this.products[index];
    this.products[index] = {
      id: currentProduct.id,
      ...changes,
    };
    return this.products[index];
  }

  //Eliminar un producto mediante su id
  async delete(id) {
    let product = await Model.findOne({
      id: id,
    });

    const { deletedCount } = await Model.deleteOne({
      id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');

    return product;
  }
}

module.exports = ProductService;
