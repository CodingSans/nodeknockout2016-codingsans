'use strict';

const koa = require('koa');
const mount = require('koa-mount');
const helmet = require('koa-helmet');
const koaRoute = require('koa-route');

const { errorHandler } = require('../util/middlewares/errorHandler');

function * init() {
  const app = koa();

  app.use(middlewares.errorHandler);
  app.use(helmet());
  
  app.use(koaRoute.get('/v2/status', function * () {
    this.body = 'OK';
  }));

  return app;
}

module.exports.init = init;