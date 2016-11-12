'use strict'

const path = require('path')
const serve = require('koa-static')
const koaRouter = require('koa-router')

const { errorHandler } = require('../util/middleware/errorHandler')

function * init () {
  const router = koaRouter()

  router.use(errorHandler)

  router.get('/', function * () {
    this.body = 'Hello from Node Knockout 2016 CodingSans!'
  })

  router.use(serve(path.join(__dirname, '/public')))

  return router
}

module.exports.init = init
