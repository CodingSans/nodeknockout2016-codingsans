'use strict'

const helmet = require('koa-helmet')
const koaRouter = require('koa-router')

const { errorHandler } = require('../util/middleware/errorHandler')

const v1Route = require('./v1/v1')
const v2Route = require('./v2/v2')

function * init () {
  const router = koaRouter()

  router.use(errorHandler)
  router.use(helmet())

  const routes = yield {
    v1: v1Route.route(),
    v2: v2Route.route()
  }

  router.use('/v1', routes.v1.routes(), routes.v1.allowedMethods())
  router.use('/v2', routes.v2.routes(), routes.v2.allowedMethods())

  return router
}

module.exports.init = init
