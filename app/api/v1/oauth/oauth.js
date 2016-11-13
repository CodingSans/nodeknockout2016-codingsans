'use strict'

const koa = require('koa')
const mount = require('koa-mount')
const Grant = require('grant-koa')
const koaRouter = require('koa-router')

function * init () {
  const app = koa()

  const grant = new Grant({
    server: {
      protocol: 'http', // TODO config
      host: 'localhost:5000', // TODO config
      callback: '/callback',
      path: '/api/v1/oauth',
      transport: 'querystring'
    },
    slack: {
      key: '103243331568.103950555554',
      secret: '2f8ad573156c90621951aedd54274073',
      callback: '/api/v1/oauth/callback/slack',
      scope: [
        'identity.basic',
        'identity.email',
        'identity.team',
        'identity.avatar'
      ]
    }
  })

  const router = yield getRouter()

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use(mount(grant))

  return app
}

function * getRouter () {
  const router = koaRouter()

  router.get('/callback/slack', function * () {
    this.status = 200
    this.body = this.query
  })

  return router
}

module.exports.init = init
