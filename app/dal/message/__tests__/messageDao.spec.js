'use strict'

const assert = require('assert')
const { initDatabase, clearAllDb } = require('../../../util/__tests__/database')
const MessageDao = require('../messageDao')

describe('Test message dao', () => {
  before(function * () {
    yield initDatabase()
    yield clearAllDb()
  })

  it('it should be empty', function * () {
    const messages = yield MessageDao.getMessagesForChannelByName('not_existing_channel')
    assert.equal(messages.length, 0)
  })

  it('it should have one message', function * () {
    const message = {
      channel: 'channel_1',
      content: 'message_1',
      senderId: 'sender_id',
      senderName: 'sender_name',
      senderAvatar: 'some_avatar_url'
    }
    yield MessageDao.postMessage(message)
    const messages = yield MessageDao.getMessagesForChannelByName('channel_1')
    assert.equal(messages.length, 1)
  })

  it('it should have one message', function * () {
    const message = {
      channel: 'channel_1',
      content: 'message_1',
      senderId: 'sender_id',
      senderName: 'sender_name',
      senderAvatar: 'some_avatar_url'
    }
    const createdMessage = yield MessageDao.postMessage(message)
    const beforeRemoveMessages = yield MessageDao.getMessagesForChannelByName('channel_1')
    assert.equal(beforeRemoveMessages.length, 2)
    yield MessageDao.removeMessage(message.channel, createdMessage._id)
    const afterRemoveMessages = yield MessageDao.getMessagesForChannelByName('channel_1')
    assert.equal(afterRemoveMessages.length, 1)
  })
})
