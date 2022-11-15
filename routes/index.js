const express = require('express');
const categoriesRouter = require('./categorias.router');
const productsRouter = require('./products.router');
const rolesRouter = require('./roles.router');
const usersRouter = require('./users.router');
const salesRouter = require('./sales.router');
const cartRouter = require('./cart.router');
const reportsDateRouter = require('./reportsDate.router');
const reportsCategoryRouter = require('./reportsCategory.router');
const reportsUserRouter = require('./reportsUser.router');
const reportsGeneralRouter = require('./reportsGeneral.router');
const suggestionsRouter = require('./sugg.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/roles', rolesRouter);
  router.use('/users', usersRouter);
  router.use('/sales', salesRouter);
  router.use('/cart', cartRouter);
  router.use('/reportsDate', reportsDateRouter);
  router.use('/reportsCategory', reportsCategoryRouter);
  router.use('/reportsUser', reportsUserRouter);
  router.use('/reportsGeneral', reportsGeneralRouter);
  router.use('/sugg', suggestionsRouter);
}

module.exports = routerApi;
