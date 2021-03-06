'use strict'

const koa = require('koa')
const mount = require('koa-mount')
const helmet = require('koa-helmet')

const { errorHandler } = require('../util/middleware/errorHandler')
const { oauthUser } = require('../util/middleware/oauthUser')

const v1Route = require('./v1/v1')
const v2Route = require('./v2/v2')

function * init () {
  const app = koa()

  app.use(errorHandler)
  app.use(helmet())

  app.use(oauthUser)

  const routes = yield {
    v1: v1Route.init(),
    v2: v2Route.init()
  }

  app.use(mount('/v1', routes.v1))
  app.use(mount('/v2', routes.v2))

  return app
}

module.exports.init = init
