const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');
class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id:           faker.datatype.uuid(),
        name:         faker.datatype.string(5),
        description:  faker.lorem.sentence(15),
        idCategory:   faker.datatype.uuid(),
        image:        faker.image.imageUrl(),
        price:        parseInt(faker.commerce.price(), 10),
        rate:         faker.datatype.number(5),
        isActive:     faker.datatype.boolean(),

      });
    }
  }

  //FAKER
  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getAll(limit) {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        var products = this.products.slice(0, limit);
        if (products.length > 0) {
          resolve(products);
        } else {
          rejected('');
        }
      }, 5000);
    });
  }

  findActiveProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeProducts = this.products.filter((x) => x.isActive === true);
        resolve(activeProducts);
      }, 2000);
    });
  }

  //Encontrar mediante el id del producto
  async getProductById(id) {

    const product = this.products.find((item) => item.id === id);

    validateData(product, NOTFOUND, 'No encontrado', (data) => !data);
    validateData(product, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);

    return product;
  }

  //Encontrar todos los productos de la categoría que se pida
  getProductByCategory(idCat) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const productsByCat = this.products.find((item) => item.idCat === idCat);
        resolve(productsByCat);
      }, 2000);
    });
  }

    //Encontrar mediante el nombre del producto
    async getProductByName(name) {

      const product = this.products.find((item) => item.name === name);

      validateData(product, NOTFOUND, 'No encontrado', (data) => !data);
      validateData(product, CONFLICT, 'CONFLICTO, el producto esta bloqueado.', (data) => data.isActive == false);

      return product;
    }

    //Modificar parcialmente un producto mediante su id
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Producto no encontrado');


    var currentProduct = this.products[index];
    this.products[index] = {
      ...currentProduct,
      ...changes,
    };
    return this.products[index];
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
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.products.splice(index, 1);
    return {
      message: 'Eliminado',
      id,
    };
  }
}

module.exports = ProductService;
