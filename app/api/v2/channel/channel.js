'use strict'

const _ = require('lodash')
const koaRouter = require('koa-router')
const koaBetterBody = require('koa-better-body')

const messageRoute = require('./message/message')

const ChannelService = require('../../../service/channel/channelService')

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
    this.body = yield ChannelService.getPublicChannels(query, limit, skip)
  })

  router.get('/:channelName', function * () {
    const channelName = this.params.channelName

    this.status = 200
    this.body = {
      count: 1,
      data: yield ChannelService.getChannelByName(channelName)
    }
  })

  router.put('/:channelName', koaBetterBody(), function * () {
    const channelName = this.params.channelName
    const body = this.request.fields

    this.status = 201
    this.body = {
      count: 1,
      data: yield ChannelService.createChannel(_.assign({}, body, { name: channelName }))
    }
  })

  router.use('/:channelName/message', routes.message.routes(), routes.message.allowedMethods())

  return router
}

module.exports.route = route
