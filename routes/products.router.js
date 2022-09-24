const express = require('express');
const router = express.Router();
const ProductService = require('../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new ProductService();

const {
  createProductDto,
  updateProductDto,
  getProductId,
  getProductCategory,
  getProductName
} = require('../dtos/products.dto');

//Crear producto
router.post(
  '/',
  validatorHandler(createProductDto, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newProduct = await service.create(body);
      res.json({
        success: true,
        message: 'Producto creado correctamente',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtener todos los productos en general
router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.getAll(limit);
  res.json(products);
});

//Obtener producto mediante id
router.get(
  '/:id',
  validatorHandler(getProductId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.getProductById(id);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtener productos mediante categoría
router.get(
  '/cat/:idCategory',
  validatorHandler(getProductCategory, 'params'),
  async (req, res, next) => {
    try {
      const { idCat } = req.params;
      const product = await service.getProductByCategory(idCat);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtener producto mediante nombre
router.get(
  '/name/:name',
  validatorHandler(getProductName, 'params'),
  async (req, res, next) => {
    try {
      const { name } = req.params;
      const product = await service.getProductByName(name);
      res.json({
        success: true,
        message: 'Este es el producto encontrado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);



//Modificar parcialmente un producto
router.patch(
  '/:id',
  validatorHandler(getProductId, 'params'),
  validatorHandler(updateProductDto, 'body'),
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

//Modificar completamente un producto
router.put(
  '/:id',
  validatorHandler(getProductId, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.updateComplete(id, body);
      res.json({
        message: 'Se ha modificado completamente el producto',
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

//Eliminar un producto
router.delete(
  '/:id',
  validatorHandler(getProductId, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json({
      message: 'Se ha eliminado el producto',
      data: product,
      id,
    });
  }
);

module.exports = router;
