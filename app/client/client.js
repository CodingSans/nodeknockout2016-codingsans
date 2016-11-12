'use strict'

const koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const koaRoute = require('koa-route')

const { errorHandler } = require('../util/middleware/errorHandler')

function * init () {
  const app = koa()

  app.use(errorHandler)

  app.use(koaRoute.get('/', function * () {
    this.body = 'Hello from Node Knockout 2016 CodingSans!'
  }))

  app.use(serve(path.join(__dirname, '/public')))

  return app
}

module.exports.init = init
