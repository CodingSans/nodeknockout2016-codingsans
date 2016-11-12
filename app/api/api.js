'use strict'

const koa = require('koa')
const mount = require('koa-mount')
const helmet = require('koa-helmet')

const { errorHandler } = require('../util/middleware/errorHandler')

const v1Route = require('./v1/v1')
const v2Route = require('./v2/v2')

function * init () {
  const app = koa()

  app.use(errorHandler)
  app.use(helmet())

  const routes = yield {
    v1: v1Route.route(),
    v2: v2Route.route()
  }

  app.use(mount('/v1', routes.v1))
  app.use(mount('/v2', routes.v2))

  return app
}

module.exports.init = init
