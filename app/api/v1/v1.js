'use strict'

const koaRouter = require('koa-router')

function * route () {
  const router = koaRouter()

  return router
}

module.exports.route = route
