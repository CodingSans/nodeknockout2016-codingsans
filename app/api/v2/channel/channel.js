'use strict'

const koaRouter = require('koa-router')
const koaBetterBody = require('koa-better-body')

const messageRoute = require('./message/message')

function * route () {
  const router = koaRouter()

  const routes = yield {
    message: messageRoute.route()
  }

  router.get('/', function * () {
    const query = this.query.q || ''
    const limit = Math.min(Number(this.query.l) || 100, 100)
    const skip = Math.max(Number(this.query.s) || 0, 0)

    this.status = 200
    this.body = {
      count: 1,
      data: [
        {
          content: `list all public channels queried by '${query}' limited by ${limit} skipped ${skip}`
        }
      ]
    }
  })

  router.get('/:channelId', function * () {
    const channelId = this.params.channelId

    this.status = 200
    this.body = {
      count: 1,
      data: [
        {
          content: `info about channel #${channelId}`
        }
      ]
    }
  })

  router.put('/:channelId', koaBetterBody(), function * () {
    const channelId = this.params.channelId
    const body = this.request.fields

    // this.status = 204
    this.body = {
      count: 1,
      data: [
        {
          content: `edit channel #${channelId}`,
          editData: body
        }
      ]
    }
  })

  router.use('/:channelId/message', routes.message.routes(), routes.message.allowedMethods())

  return router
}

module.exports.route = route
