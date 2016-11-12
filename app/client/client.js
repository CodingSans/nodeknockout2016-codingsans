'use strict';

const koa = require('koa');
const serve = require('koa-static');

const { errorHandler } = require('../util/middlewares/errorHandler');

function * init() {
  const app = koa();

  app.use(middlewares.errorHandler);
  
  app.use(koaRoute.get('/', function * () {
    this.body = 'Hello from Node Knockout 2016 CodingSans!';
  }));

  app.use(serve(path.join(__dirname, '/public')));

  return app;
}

module.exports.init = init;