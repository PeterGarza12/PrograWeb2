const express = require('express');
const router = express.Router();
const RolesService = require('../services/roles.service');
const validatorHandler = require('./../middlewares/validator.handler');
const service = new RolesService();
const {
  createRolesDto,
  //updateRolesDto,
  //getRolesIdDto,
} = require('../dtos/roles.dto');

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

router.get('/', async (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = await service.getAll(limit);
  res.json(products);
});

module.exports = router;
