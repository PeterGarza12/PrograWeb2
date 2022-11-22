const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');
const UsersService = require('../services/users.service');
const { encrypt, compare } = require('../utils/password.handler');
const { signToken } = require('../utils/jwt.handler');
const validatorHandler = require('./../middlewares/validator.handler');

const service = new UsersService();
const {
  createUserDto, getUserIdDto, updateUserDto, LoginDto
} = require('../dtos/users.dto');

//Es para crear el rol desde navegador
router.post(
  '/signup',
  validatorHandler(createUserDto, 'body'),
  async(req, res, next) => {
    try {
      const password = await encrypt(req.body['password']);
      const bodyInsert = { ...req.body, password };
      const newUser = await service.create(bodyInsert);
      res.json({
        success: true,
        token: await signToken(newUser),
        message: 'Se ha registrado el usuario correctamente',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/login',
  validatorHandler(LoginDto, 'body'),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await service.getByEmail(email); //FILTRO SELECT DEL PASSWORD
      if (!user) {
        throw boom.notFound('No se encontro el usuario');
      }
      const hashPassword = user.get('password'); //NO SE PUEDE ACCEDER DIRECTAMENTE A LA PROPIEDAD
      const check = await compare(password, hashPassword);
      if (!check) {
        throw boom.unauthorized('No se encontro usuario');
      }
      user.set('password', undefined, {strict: false});
      res.json({
        success: true,
        token: await signToken(user),
        data: user,
        message: 'Usuario logeado',
      });
    } catch (error) {
      next(error);
    }
  }
);


//Obtiene todos los elementos de manera general
router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.getAll(limit);
  res.json(products);
});

//Traer el rol por id
router.get(
  '/:id',
  validatorHandler(getUserIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.getById(id);
      res.json({
        success: true,
        message: 'Usuario encontrado',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Modificar usuario
router.patch(
  '/update/:id',
  validatorHandler(getUserIdDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const password = await encrypt(req.body['password']);
      const bodyInsert = { ...req.body, password };
      const user = await service.update(id, bodyInsert);
      res.json({
        success: true,
        message: 'Usuario modificado',
        data: user,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

//Eliminar un elemento con el id
router.delete(
  '/:id',
  validatorHandler(getUserIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.json({
        message: 'Se ha eliminado correctamente',
        data:user,
      });
    }
    catch (error){
      next(error);
    }
  }
);

//Modificar al usuario completamente
router.put(
  '/:id',
  validatorHandler(getUserIdDto, 'params'),
  validatorHandler(updateUserDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.updateComplete(id, body);
      res.json({
        message: 'Se ha modificado el usuario completamente',
        data: user,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
