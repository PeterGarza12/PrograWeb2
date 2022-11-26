const express = require('express');
const router = express.Router();
const ReportService = require('../services/reportsUser.service');
const validatorHandler = require('../middlewares/validator.handler');
const service = new ReportService();

const {
  createReportUser,
  getReportEmail
} = require('../dtos/reports.dto');

//Crear reporte por usuario
router.post(
  '/',
  validatorHandler(createReportUser, 'body'),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newReport = await service.create(body);
      res.json({
        success: true,
        message: 'Reporte de usuario creado correctamente',
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
    const limit = size || 20;
    const reports = await service.getAll(limit);
    res.json(reports);
  }
);

//Obtener reporte mediante su id
router.get(
  '/:email',
  validatorHandler(getReportEmail, 'params'),
  async (req, res, next) => {
    try {
      const { email } = req.params;
      const report = await service.getReportByEmail(email);
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
