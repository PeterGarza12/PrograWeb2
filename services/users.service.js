//const faker = require('faker');
const boom = require('@hapi/boom');
const Model = require('../models/users.model');
//const { validateData, NOTFOUND, CONFLICT } = require('./../utils');

class UsersService {

  constructor() {}

  //Crear usuario
  async create(data) {
    // const model = new Model(data);
    // await model.save();
    // return data;
    const exists = await Model.findOne({ email: data.email });
    if (exists) {
      throw boom.unauthorized('Ya existe un usuario con ese correo y nombre de usuario');
    }
    const userData = await Model.create(data);
    userData.set("password", undefined, {strict: false});
    return userData;
  }

  //Traer todos los usuarios
  async getAll(limit){

    let response = {};

    let productsDB = await Model.find();

    //Obtenemos solo la cantidad deseada de registros
    response['users'] = limit
      ? productsDB.filter((item, index) => item && index < limit)
      : productsDB;

    return response;

  }

  //Traer usuarios por id
  async getById(id){

    const user = await Model.findOne({
      _id: id,
    });
    if (user == undefined || user == null)
      throw boom.notFound('No se encontro el usuario');
    else if (user.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return user;
  }

  //Traer usuarios por email
  async getByEmail(email){

    const user = await Model.findOne({
      email: email,
    });
    if (user == undefined || user == null)
      throw boom.notFound('No se encontro el usuario');
    else if (user.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return user;
  }

  async findOneDB(data) {
    const User = await Model.findOne(data).select('password name role email');
    if (User == undefined || User == null)
      throw boom.notFound('No se encontro');
    else if (User.length <= 0)
      throw boom.notFound('No se encontro ningún registro');
    return User;
  }

  //Modificar usuario parcialmente
  async update(id, changes) {

    let user = await Model.findOne({
      _id: id,
    });
    if (user == undefined || user == null)
      throw boom.notFound('No se encontro el usuario');
    else if (user.length <= 0)
      throw boom.notFound('No se encontro ningún registro');

    let userOriginal = {
      username: user.username,
      password: user.password,
      phone: user.phone,
    };

    const { username, password, phone } = changes;
    user.username = username;
    user.password = password;
    user.phone = phone;

    console.log(user.password);

    user.save();

    return {
      original: userOriginal,
      actualizado: user,
    };

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

    let user = await Model.findOne({
      _id: id,
    });

    const { deletedCount } = await Model.deleteOne({
      _id: id,
    });
    if (deletedCount <= 0)
      throw boom.notFound('El registro seleccionado no existe');

    return user;
  }

}

module.exports = UsersService;
