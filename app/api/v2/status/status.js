'use strict'

const koaRouter = require('koa-router')

function * route () {
  const router = koaRouter()

  router.get('/', function * () {
    this.body = { status: 'OK' }
  })

  return router
}

module.exports.route = route
