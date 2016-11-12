'use strict'

const co = require('co')
const koa = require('koa')
const mount = require('koa-mount')
const logger = require('koa-logger')

const config = require('./config/config')
const db = require('./dal/db')

const apiServer = require('./api/api')
const clientServer = require('./client/client')

const start = co.wrap(function * start () {
  const app = koa()

  app.use(logger())

  const routes = yield {
    api: apiServer.init(),
    client: clientServer.init()
  }

  app.use(mount('/api', routes.api))
  app.use(mount('/', routes.client))

  yield db.start()

  console.log('MongoDB connection estabilished.')

  yield new Promise((resolve) => {
    app.listen(config.server.port, '0.0.0.0', () => {
      console.log(`Listening on 0.0.0.0:${config.server.port}`)
      return resolve()
    })
  })

  return app
})

start().catch((err) => setTimeout(() => { throw err }))
