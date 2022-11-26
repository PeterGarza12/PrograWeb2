const express = require('express');
const categoriesRouter = require('./categorias.router');
const productsRouter = require('./products.router');
const topproductsRouter = require('./top.router');
const rolesRouter = require('./roles.router');
const usersRouter = require('./users.router');
const salesRouter = require('./sales.router');
const cartRouter = require('./cart.router');
const reportsUserRouter = require('./reportsUser.router');
const suggestionsRouter = require('./sugg.router');
const storageRouter = require('./storage.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/top', topproductsRouter);
  router.use('/roles', rolesRouter);
  router.use('/users', usersRouter);
  router.use('/sales', salesRouter);
  router.use('/cart', cartRouter);
  router.use('/reportsUser', reportsUserRouter);
  router.use('/sugg', suggestionsRouter);
  router.use('/storage', storageRouter);
}

module.exports = routerApi;
