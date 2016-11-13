'use strict'

const Message = require('./messageModel').model

function * getMessagesForChannelByName (channelName) {
  return Message.find({ channel: channelName }).exec()
}

function * postMessage (message) {
  const newMessage = new Message(message)
  return newMessage.save()
}

function * removeMessage (channelName, messageId) {
  return Message.remove({ _id: messageId, channel: channelName }).exec()
}

exports.getMessagesForChannelByName = getMessagesForChannelByName
exports.postMessage = postMessage
exports.removeMessage = removeMessage
