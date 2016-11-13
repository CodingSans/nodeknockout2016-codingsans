const MessageDao = require('../../dal/message/messageDao')
const ChannelDao = require('../../dal/channel/channelDao')

function * getMessagesForChannelByName (channelName, limit, skip) {
  const count = yield MessageDao.count(channelName)
  const messages = yield MessageDao.getMessagesForChannelByName(channelName, limit, skip)
  return { data: messages, count }
}

function * createMessage (message) {
  const channel = yield ChannelDao.getChannelByName(message.channel)
  if (!channel.length) {
    yield ChannelDao.postChannel({
      name: message.channel,
      public: true
    })
  }
  const created = yield MessageDao.postMessage(message)
  return created
}

function * removeMessage (channelName, messageId) {
  const removed = yield MessageDao.removeMessage(channelName, messageId)
  return removed
}

exports.getMessagesForChannelByName = getMessagesForChannelByName
exports.createMessage = createMessage
exports.removeMessage = removeMessage
