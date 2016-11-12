'use strict'

const assert = require('assert')
const { initDatabase, clearAllDb } = require('../../../util/__tests__/database')
const ChannelDao = require('../channelDao')

describe('Test channel dao', () => {
  before(function * () {
    yield initDatabase()
  })

  it('it should be empty', function * () {
    const channels = yield ChannelDao.getPublicChannels()
    assert.equal(channels.length, 0)
  })

  it('it should have zero channel', function * () {
    const channel = {
      name: 'private 1',
      public: false
    }
    yield ChannelDao.postChannel(channel)
    const channels = yield ChannelDao.getPublicChannels()
    assert.equal(channels.length, 0)
  })

  it('it should have one channel', function * () {
    const channel = {
      name: 'public 1',
      public: true
    }
    yield ChannelDao.postChannel(channel)
    const channels = yield ChannelDao.getPublicChannels()
    assert.equal(channels.length, 1)
    assert.equal(channels[0].name, channel.name)
  })

  after(function * () {
    yield clearAllDb()
  })
})
