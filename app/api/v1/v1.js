'use strict'

const koa = require('koa')

function * route () {
  const app = koa()

  return app
}

module.exports.route = route
