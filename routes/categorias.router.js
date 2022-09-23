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
        message: 'Este es la categoria encontrada',
        data: categoria,
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
      message: 'delete',
      data:categoria,
    });
  }
);

module.exports = router;
