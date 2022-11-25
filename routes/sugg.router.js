const express = require('express');
const router = express.Router();
const SuggestionService = require('../services/sugg.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new SuggestionService();

const {
  createSuggestion,
  updateSuggestion,
  getSuggestionById,
  getSuggestionByUser
} = require('../dtos/sugg.dto');

//Crear sugerencia
router.post(
  '/create',
  validatorHandler(createSuggestion, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newSuggestion = await service.create(body);
      res.json({
        success: true,
        message: 'Sugerencia creada correctamente',
        data: newSuggestion,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtener todas las sugerencias en general
router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const suggestions = await service.getAll(limit);
  res.json(suggestions);
});

//Obtener sugerencia mediante su id
router.get(
  '/id/:id',
  validatorHandler(getSuggestionById, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const suggestion = await service.getSuggestionById(id);
      res.json({
        success: true,
        message: 'Esta es la sugerencia encontrada',
        data: suggestion,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Obtener sugerencia mediante id del usuario
router.get(
  '/user/:idUser',
  validatorHandler(getSuggestionByUser, 'params'),
  async (req, res, next) => {
    try {
      const { idUser } = req.params;
      const suggestion = await service.getSuggestionByIdUser(idUser);
      res.json({
        success: true,
        message: 'Esta es la sugerencia encontrada',
        data: suggestion,
      });
    } catch (error) {
      next(error);
    }
  }
);

//Modificar parcialmente una sugerencia
router.patch(
  '/:idUser',
  validatorHandler(getSuggestionByUser, 'params'),
  validatorHandler(updateSuggestion, 'body'),
  async (req, res) => {
    try {
      const { idUser } = req.params;
      const body = req.body;
      const suggestion = await service.update(idUser, body);
      res.json({
        message: 'Se ha modificado parcialmente una sugerencia',
        data: suggestion,
        idUser,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
