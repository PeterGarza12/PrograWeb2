const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND } = require('./../utils');

class SalesService {

  constructor() {
    this.sales = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.sales.push({
        id: faker.datatype.uuid(),
        userid: faker.datatype.uuid(),
        productid: faker.datatype.uuid(),
        price: parseInt(faker.commerce.price(), 10),
        date: faker.date.between('2020-01-01T00:00:00.000Z', '2030-01-01T00:00:00.000Z'),
      });
    }
  }

  //Crea nueva compra
  async create(data) {
    const newSale = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.sales.push(newSale);
    return newSale;
  }

  //Consigue todas las compras en general
  getAll(limit){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        var sales = this.sales.slice(0, limit);
        if(sales.length>0){
          resolve(sales);
        }
        else{
          rejected('');
        }
      }, 5000);
    });
  }

  //Consigue una compra por su id
  async getById(id){
    const sale = this.sales.find((item) => item.id === id);

    validateData(sale, NOTFOUND, 'Elemento no encontrado',          (data) => !data);
    return sale;
  }

  //Consigue las compras por el id del usuario que realizo la compra
  getByUserId(userid) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userSales = this.sales.filter((x) => x.userid === userid);
        resolve(userSales);
      }, 2000);
    });
  }

  //Elimina un registro de compra
  async delete(id) {
    const index = this.sales.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Producto no encontrado');
    }
    this.sales.splice(index, 1);
    return {
      message: 'Elemento eliminado',
      id,
    };
  }

}
module.exports = SalesService;
