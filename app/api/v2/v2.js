'use strict'

const koa = require('koa')
const koaRoute = require('koa-route')

function * route () {
  const app = koa()

  app.use(koaRoute.get('/status', function * () {
    this.body = 'OK'
  }))

  return app
}

module.exports.route = route
