'use strict'

const koaRouter = require('koa-router')

const statusRoute = require('./status/status')
const channelRoute = require('./channel/channel')

function * route () {
  const router = koaRouter()

  const routes = yield {
    status: statusRoute.route(),
    channel: channelRoute.route()
  }

  router.use('/status', routes.status.routes(), routes.status.allowedMethods())
  router.use('/channel', routes.channel.routes(), routes.channel.allowedMethods())

  return router
}

module.exports.route = route
