const express = require('express');
const router = express.Router();
const RolesService = require('../services/roles.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new RolesService();
const {
  createRolesDto, getRolesIdDto,
  //updateRolesDto,
  //getRolesIdDto,
} = require('../dtos/roles.dto');

//Es para crear el rol desde navegador
router.post(
  '/',
  validatorHandler(createRolesDto, 'body'),
  async(req, res, next) => {
    const body = req.body;
    try {
      const newRoles = await service.create(body);
      res.json({
        success: true,
        message: 'Has creado un rol',
        data: newRoles,
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

//Obtiene todos los roles que estén activos
router.get('/Active', async (req, res) => {
  const products = await service.getActive();
  res.json(products);
});

//Traer el rol por id
router.get(
  '/:id',
  validatorHandler(getRolesIdDto, 'params'),
  async(req, res, next) => {
    try {
      const {id} = req.params;
      const rol = await service.getById(id);
      res.json({
        success: true,
        message: 'Este es el rol encontrado',
        data: rol,
      });
    } catch (error) {
      next(error);
    }
  }
)

//Eliminar un elemento con el id
router.delete(
  '/:id',
  validatorHandler(getRolesIdDto, 'params'),
  async (req, res) => {
    const { id } = req.params;
    res.json({
      message: 'delete',
      id,
    });
  }
);

module.exports = router;
