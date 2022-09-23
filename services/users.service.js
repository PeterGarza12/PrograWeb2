const faker = require('faker');
const boom = require('@hapi/boom');
const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 3;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        isActive: true,
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        // eslint-disable-next-line no-useless-escape
        password: faker.internet.password(8,false,/^[a-zA-Z0-9\-_]$/),
        email: faker.internet.email(),
        role: faker.datatype.number({ min: 0, max: 2}),
        phone: faker.phone.phoneNumber('811#######'),
        image: faker.image.imageUrl(),
      });
    }
  }

  //Crear usuario
  async create(data) {
    const newUser = {
      isActive: true,
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  //Traer todos los usuarios
  getAll(limit){
    return new Promise((resolve, rejected)=>{
      setTimeout(()=>{
        var users = this.users.slice(0, limit);
        if(users.length>0){
          resolve(users);
        }
        else{
          rejected('');
        }
      }, 5000);
    });
  }

  //Traer usuarios por id
  async getById(id){
    const user = this.users.find((item) => item.id === id);

    validateData(user, NOTFOUND, 'No encontrado',          (data) => !data);
    validateData(user, CONFLICT, 'El usuario no está activo',  (data) => data.isActive == false);
    return user;
  }

  //Modificar usuario parcialmente
  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Usuario no encontrado');

    var currentUser = this.users[index];
    this.users[index] = {
      ...currentUser,
      ...changes,
    };
    return this.users[index];
  }

  //Modificar usuario completamente
  async updateComplete(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) throw boom.notFound('Usuario no encontrado');
    //throw new Error('Product not found'); Forma tradicional

    var currentUser = this.users[index];
    this.users[index] = {
      id: currentUser.id,
      ...changes,
    };
    return this.users[index];
  }

  //Eliminar usuario
  async delete(id) {
    const index = this.users.findIndex((item) => item.id == id);
    if (index === -1) {
      if (index === -1) throw boom.notFound('Usuario no encontrado');
    }
    this.users.splice(index, 1);
    return {
      message: 'Usuario eliminado',
      id,
    };
  }

}

module.exports = UsersService;
