'use strict'

const _ = require('lodash')
const koaRouter = require('koa-router')
const koaBetterBody = require('koa-better-body')

const MessageService = require('../../../../service/message/messageService')

function * route () {
  const router = koaRouter()

  router.get('/', function * () {
    const channelName = this.params.channelName
    const limit = Math.min(Number(this.query.l) || 100, 100)
    const skip = Math.max(Number(this.query.s) || 0, 0)

    this.status = 200
    this.body = yield MessageService.getMessagesForChannelByName(channelName, limit, skip)
  })

  router.post('/', koaBetterBody(), function * () {
    const channelName = this.params.channelName
    const body = this.request.fields

    this.status = 201
    this.body = {
      count: 1,
      data: yield MessageService.createMessage(_.assign({}, body, { channel: channelName }))
    }
  })

  router.delete('/:messageId', function * () {
    const channelName = this.params.channelName
    const messageId = this.params.messageId

    yield MessageService.removeMessage(channelName, messageId)
    this.status = 204
  })

  return router
}

module.exports.route = route
