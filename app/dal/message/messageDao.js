'use strict'

const Message = require('./messageModel').model

function * getMessagesForChannelByName (channelName) {
  return Message.find({ channel: channelName }).exec()
}

function * postMessage (message) {
  const newMessage = new Message(message)
  return newMessage.save()
}

exports.getMessagesForChannelByName = getMessagesForChannelByName
exports.postMessage = postMessage
