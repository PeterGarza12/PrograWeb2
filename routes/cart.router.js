const express = require('express');
const router = express.Router();
const CartsService = require('../services/cart.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new CartsService();
const {
  createCartDto, updateCartDto, getCartByIdDto, getCartByUserIdDto
} = require('../dtos/cart.dto');

//Crear carrito
router.post(
  '/',
  validatorHandler(createCartDto, 'body'),
  async(req, res, next) => {
    const body = req.body;
    try {
      const newCart = await service.create(body);
      res.json({
        success: true,
        message: 'Se ha creado el carrito',
        data: newCart,
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
  const carts = await service.getAll(limit);
  res.json(carts);
});

//Traer el carrito por id
router.get(
  '/:id',
  validatorHandler(getCartByIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const cart = await service.getById(id);
      res.json({
        success: true,
        message: 'Carrito:',
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Traer el carrito por id de usuario
router.get(
  '/user/:userid',
  validatorHandler(getCartByUserIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { userid } = req.params;
      const cart = await service.getByUserId(userid);
      res.json({
        success: true,
        message: 'Carrito:',
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Actualizar carrito
router.patch(
  '/:userid',
  validatorHandler(getCartByUserIdDto, 'params'),
  validatorHandler(updateCartDto, 'body'),
  async (req, res) => {
    try {
      const { userid } = req.params;
      const body = req.body;
      const cart = await service.updateCart(userid, body);
      res.json({
        message: 'update total',
        data: cart,
        userid,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
