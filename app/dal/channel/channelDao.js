'use strict'

const Channel = require('./channelModel').model

function * getPublicChannels () {
  return Channel.find({ public: true }).exec()
}

function * postChannel (channel) {
  const newChannel = new Channel(channel)
  return newChannel.save()
}

exports.getPublicChannels = getPublicChannels
exports.postChannel = postChannel
