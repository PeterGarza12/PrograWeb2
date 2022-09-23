const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND } = require('./../utils');

class CartsService {

  constructor() {
    this.carts = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.carts.push({
        id: faker.datatype.uuid(),
        userid: faker.datatype.uuid(),
        products: faker.datatype.array(5),
      });
    }
  }

  async create(data) {
    const newCart = {
      id: faker.datatype.uuid(),
      ...data,
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

    //Consigue el carrito por su id
    async getById(id){
      const cart = this.carts.find((item) => item.id === id);

      validateData(cart, NOTFOUND, 'Elemento no encontrado',          (data) => !data);
      return cart;
    }

    //Consigue el carrito por su id
    async getByUserId(userid){
      const cart = this.carts.find((item) => item.userid === userid);

      validateData(cart, NOTFOUND, 'Elemento no encontrado',          (data) => !data);
      return cart;
    }

  //Modificar carrito
  async updateCart(userid, changes) {
    const index = this.carts.findIndex((item) => item.userid === userid);

    if (index === -1) throw boom.notFound('Producto no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentCart = this.carts[index];
    this.carts[index] = {
      ...currentCart,
      ...changes,
    };
    return this.carts[index];
  }

  //No se ocupara, solo por motivos de testeo
  getAll(limit){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        var carts = this.carts.slice(0, limit);
        if(carts.length>0){
          resolve(carts);
        }
        else{
          rejected('');
        }
      }, 5000);
    });
  }

}

module.exports = CartsService;
