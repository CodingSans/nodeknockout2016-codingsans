'use strict'

const koa = require('koa')
const Boom = require('boom')
const mount = require('koa-mount')
const Grant = require('grant-koa')
const koaRouter = require('koa-router')

const config = require('../../../config/config')

const oauthUserService = require('../../../service/oauthUser/oauthUserService')

function * init () {
  const app = koa()

  const grant = new Grant({
    server: {
      protocol: config.server.protocol,
      host: config.server.host,
      callback: '/callback',
      path: '/api/v1/oauth',
      transport: 'querystring'
    },
    slack: {
      key: config.oauth.slack.key,
      secret: config.oauth.slack.secret,
      callback: '/api/v1/oauth/callback/slack',
      scope: [
        'identity.basic',
        // 'identity.email',
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

  router.get('/callback/:provider', function * () {
    const provider = this.params.provider
    const accessToken = this.query.access_token

    if (!accessToken) {
      throw Boom.unauthorized('missing accessToken')
    }

    const user = yield oauthUserService.getUser(provider, accessToken)

    this.session.oauth = {
      provider: provider,
      accessToken,
      userid: user.id
    }

    this.redirect('/wall/general/chat')
  })

  return router
}

module.exports.init = init
