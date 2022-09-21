const faker = require('faker');
//const boom = require('@hapi/boom');
//const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

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

  getById(){

  }

  getActive(){

  }

  delete(){

  }

}

module.exports = RolesService;
