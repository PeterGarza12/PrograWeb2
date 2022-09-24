const express = require('express');
const router = express.Router();
const CategoriasService = require('../services/categorias.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new CategoriasService();
const {
  createCategoriasDto, getCategoriasIdDto

} = require('../dtos/categorias.dto');


router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.getAll(limit);
  res.json(products);
});


router.get(
  '/:id',
  validatorHandler(getCategoriasIdDto, 'params'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const categoria = await service.getById(id);
      res.json({
        success: true,
        message: 'Esta es la categoría encontrada',
        data: categoria,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategoriasDto, 'body'),
  async(req, res, next) => {
    const body = req.body;
    try {
      const newCat = await service.create(body);
      res.json({
        success: true,
        message: 'Se ha creado la categoría',
        data: newCat,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Eliminar un elemento con el id
router.delete(
  '/:id',
  validatorHandler(getCategoriasIdDto, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const categoria = await service.delete(id);
    res.json({
      message: 'Categoría eliminada',
      data:categoria,
    });
  }
);

module.exports = router;
