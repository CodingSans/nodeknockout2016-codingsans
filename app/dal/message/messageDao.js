'use strict'

const Message = require('./messageModel').model

function * getMessagesForChannelByName (channelName, limit, skip) {
  return Message.find({ channel: channelName }).limit(limit).skip(skip).exec()
}

function * postMessage (message) {
  const newMessage = new Message(message)
  return newMessage.save()
}

function * removeMessage (channelName, messageId) {
  return Message.remove({ _id: messageId, channel: channelName }).exec()
}

function * count (channelName) {
  return Message.count({ channel: channelName }).exec()
}

exports.getMessagesForChannelByName = getMessagesForChannelByName
exports.postMessage = postMessage
exports.removeMessage = removeMessage
exports.count = count
