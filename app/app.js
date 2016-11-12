'use strict'

const co = require('co')
const koa = require('koa')
const mount = require('koa-mount')
const koaBunyanLogger = require('koa-bunyan-logger')

const config = require('./config/config')
const db = require('./dal/db')
const logger = require('./util/logger')

const apiServer = require('./api/api')
const clientServer = require('./client/client')

const start = co.wrap(function * start () {
  const app = koa()

  const koaLogger = logger.child()

  app.use(koaBunyanLogger(koaLogger))
  app.use(koaBunyanLogger.requestLogger())

  const routes = yield {
    api: apiServer.init(),
    client: clientServer.init()
  }

  app.use(mount('/api', routes.api))
  app.use(mount('/', routes.client))

  yield db.start()

  koaLogger.info('MongoDB connection estabilished.')

  yield new Promise((resolve) => {
    app.listen(config.server.port, '0.0.0.0', () => {
      koaLogger.info(`Listening on 0.0.0.0:${config.server.port}`)
      return resolve()
    })
  })

  return app
})

start().catch((err) => setTimeout(() => { throw err }))
