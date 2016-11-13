'use strict'

const koa = require('koa')
const mount = require('koa-mount')

const oauthRoute = require('./oauth/oauth')

function * init () {
  const app = koa()

  const routes = yield {
    oauth: oauthRoute.init()
  }

  app.use(mount('/oauth', routes.oauth))

  return app
}

module.exports.init = init
