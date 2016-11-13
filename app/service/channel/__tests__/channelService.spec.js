'use strict'

const _ = require('lodash')
const assert = require('assert')
const { initDatabase, clearAllDb } = require('../../../util/__tests__/database')
const ChannelService = require('../channelService')

describe('Test channel service', () => {
  before(function * () {
    yield initDatabase()
    yield clearAllDb()
  })

  it('should be empty', function * () {
    const messages = yield ChannelService.getPublicChannels()
    assert.equal(messages.count, 0)
    assert.equal(messages.data.length, 0)
  })

  it('should create private channel', function * () {
    const channel = {
      name: 'public 1',
      public: false
    }
    const created = yield ChannelService.createChannel(channel)
    assert.ok(created, 'Channel created')
  })

  it('should create public channel', function * () {
    const channel = {
      name: 'public 2',
      public: true
    }
    yield ChannelService.createChannel(channel)
    const messages = yield ChannelService.getPublicChannels()
    assert.equal(messages.count, 1)
    assert.equal(messages.data.length, 1)
    assert.equal(messages.data[0].name, channel.name)
  })

  it('should query public channel', function * () {
    const channel1 = {
      name: 'test 1',
      public: true
    }

    const channel2 = {
      name: 'test 2',
      public: true
    }

    const channel3 = {
      name: 'channel 1',
      public: true
    }

    const channel4 = {
      name: 'channel 2',
      public: true
    }
    yield ChannelService.createChannel(channel1)
    yield ChannelService.createChannel(channel2)
    yield ChannelService.createChannel(channel3)
    yield ChannelService.createChannel(channel4)
    const tests = yield ChannelService.getPublicChannels('test')
    const channels = yield ChannelService.getPublicChannels('channel')
    assert.equal(tests.count, 2)
    assert.equal(tests.data.length, 2)
    assert.equal(channels.count, 2)
    assert.equal(channels.data.length, 2)
  })

  it('should query limit public channel', function * () {
    const channel = {
      name: 'limiter ',
      public: true
    }
    for (let i = 0; i < 25; i++) {
      channel.name += i
      yield ChannelService.createChannel(channel)
    }
    const limiters = yield ChannelService.getPublicChannels('limiter', 10)
    assert.equal(limiters.count, 25)
    assert.equal(limiters.data.length, 10)
  })
})
