const express = require('express');
const router = express.Router();
const TopProductService = require('../services/top.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new TopProductService();

const {
  createTopProductDto
} = require('../dtos/top.dto');

//Crear producto
router.post(
  '/',
  validatorHandler(createTopProductDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      res.json({
        success: true,
        message: 'Top creado correctamente',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);


//Obtener todos los productos en general
router.get('/',
 async (req, res) => {
  const { size } = req.query;
  const limit = size || 4;
  const products = await service.getAll(limit);
  res.json(products);
});


//Modificar parcialmente un producto
router.patch(
  '/:id',
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'Se ha modificado parcialmente el producto',
        data: product,
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
