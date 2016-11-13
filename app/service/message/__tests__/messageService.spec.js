'use strict'

const _ = require('lodash')
const assert = require('assert')
const { initDatabase, clearAllDb } = require('../../../util/__tests__/database')
const ChannelService = require('../../channel/channelService')
const MessageService = require('../messageService')

describe('Test message service', () => {
  before(function * () {
    yield initDatabase()
    yield clearAllDb()
  })

  it('should be empty', function * () {
    const messages = yield MessageService.getMessagesForChannelByName('')
    assert.equal(messages.count, 0)
    assert.equal(messages.data.length, 0)
  })

  it('should have one channel with one message', function * () {
    const message = {
      channel: 'message_test',
      content: 'content 1',
      senderId: 'id',
      senderName: 'name'
    }
    yield MessageService.createMessage(message)
    const messages = yield MessageService.getMessagesForChannelByName(message.channel)
    const channels = yield ChannelService.getPublicChannels()
    assert.equal(messages.count, 1)
    assert.equal(messages.data.length, 1)
    assert.equal(channels.count, 1)
    assert.equal(channels.data.length, 1)
  })

  it('should remove a message message', function * () {
    const channels = yield ChannelService.getPublicChannels()
    const channelName = channels.data[0].name
    const messages = yield MessageService.getMessagesForChannelByName(channelName)
    const messageId = messages.data[0]._id
    yield MessageService.removeMessage(channelName, messageId)

    const afterRemove = yield MessageService.getMessagesForChannelByName(channelName)
    assert.equal(afterRemove.count, 0)
    assert.equal(afterRemove.data.length, 0)
  })
})
