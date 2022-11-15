const express = require('express');
const router = express.Router();
const ReportService = require('../services/reportsCategory.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ReportService();

const {
  createReportCat,
  getReportId
} = require('../dtos/reports.dto');

//Crear reporte por categoría
router.post(
  '/',
  validatorHandler(createReportCat, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newReport = await service.create(body);
      res.json({
        success: true,
        message: 'Reporte de categoria creado correctamente',
        data: newReport,
      });
    } catch (error) {
      next(error);
    }
  }
)

//Obtener todos los reportes creados
router.get(
  '/',
  async (req, res) => {
    const { size } = req.query;
    const limit = size || 10;
    const reports = await service.getAll(limit);
    res.json(reports);
  }
);

//Obtener reporte mediante su id
router.get(
  '/:id',
  validatorHandler(getReportId, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await service.getReportById(id);
      res.json({
        success: true,
        message: 'Este es el reporte encontrado',
        data: report,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
