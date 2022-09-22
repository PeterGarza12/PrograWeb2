const express = require('express');
const router = express.Router();
const UsersService = require('../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new UsersService();
const {
  createUserDto, getUserIdDto
  //updateUserDto,
} = require('../dtos/users.dto');

//Es para crear el rol desde navegador
router.post(
  '/register',
  validatorHandler(createUserDto, 'body'),
  async(req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);
      res.json({
        success: true,
        message: 'Se ha registrado el usuario',
        data: newUser,
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

//Eliminar un elemento con el id
router.delete(
  '/:id',
  validatorHandler(getUserIdDto, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json({
      message: 'delete',
      data:user,
    });
  }
);

module.exports = router;
