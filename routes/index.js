const express = require('express');
const productsRouter = require('./products.router');
const rolesRouter = require('./roles.router');
const reportsRouter = require('./reports.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/roles', rolesRouter);
  router.use('/reports', reportsRouter);
  //router.use('/categories', productsRouter);

}

module.exports = routerApi;
