'use strict'

const koaRouter = require('koa-router')
const koaBetterBody = require('koa-better-body')

function * route () {
  const router = koaRouter()

  router.get('/', function * () {
    const channelId = this.params.channelId
    const limit = Math.min(Number(this.query.l) || 100, 100)
    const skip = Math.max(Number(this.query.s) || 0, 0)

    this.status = 200
    this.body = {
      count: 1,
      data: [
        {
          message: `Messages from channel #${channelId} limited by ${limit} skipped ${skip}`
        }
      ]
    }
  })

  router.post('/', koaBetterBody(), function * () {
    const channelId = this.params.channelId
    const body = this.request.fields

    this.status = 201
    this.body = {
      count: 1,
      data: [
        {
          message: `Created new message into channel #${channelId}`,
          body: body
        }
      ]
    }
  })

  router.delete('/:messageId', function * () {
    const channelId = this.params.channelId
    const messageId = this.params.messageId
    // this.status = 204
    this.body = `Remove message ${messageId} from channel #${channelId}`
  })

  return router
}

module.exports.route = route
