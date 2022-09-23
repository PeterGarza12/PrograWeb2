const express = require('express');
const router = express.Router();
const SalesService = require('../services/sales.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new SalesService();
const {
  createSaleDto, getSaleByIdDto, getSaleByUserIdDto, //getSaleByIdDto, getSaleByUserIdDto
} = require('../dtos/sales.dto');

//Crear un registro de compra
router.post(
  '/',
  validatorHandler(createSaleDto, 'body'),
  async(req, res, next) => {
    const body = req.body;
    try {
      const newSales = await service.create(body);
      res.json({
        success: true,
        message: 'Se ha creado un registro de compra',
        data: newSales,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtiene todos los registros de compra en general
router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const sales = await service.getAll(limit);
  res.json(sales);
});

//Conseguir registro de compra por id
router.get(
  '/:id',
  validatorHandler(getSaleByIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const sale = await service.getById(id);
      res.json({
        success: true,
        message: 'Registro encontrado',
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Conseguir registro por id de usuario
router.get(
  '/user/:userid',
  validatorHandler(getSaleByUserIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { userid } = req.params;
      const sale = await service.getByUserId(userid);
      res.json({
        success: true,
        message: 'Este registro no fue encontrado',
        data: sale,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar un elemento con el id
router.delete(
  '/:id',
  validatorHandler(getSaleByIdDto, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const sale = await service.delete(id);
    res.json({
      message: 'delete',
      data:sale,
    });
  }
);

module.exports = router;

