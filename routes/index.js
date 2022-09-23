const express = require('express');
const productsRouter = require('./products.router');
const rolesRouter = require('./roles.router');
const usersRouter = require('./users.router');
const salesRouter = require('./sales.router');
const cartRouter = require('./cart.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/roles', rolesRouter);
  router.use('/users', usersRouter);
  router.use('/sales', salesRouter);
  router.use('/cart', cartRouter);

  //router.use('/categories', productsRouter);

}

module.exports = routerApi;
