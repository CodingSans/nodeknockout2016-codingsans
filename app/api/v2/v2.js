'use strict'

const koa = require('koa')
const koaRouter = require('koa-router')

const statusRoute = require('./status/status')
const channelRoute = require('./channel/channel')

function * init () {
  const router = koaRouter()

  const routes = yield {
    status: statusRoute.route(),
    channel: channelRoute.route()
  }

  router.use('/status', routes.status.routes(), routes.status.allowedMethods())
  router.use('/channel', routes.channel.routes(), routes.channel.allowedMethods())

  const app = koa()

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}

module.exports.init = init
