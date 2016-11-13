'use strict'

const Channel = require('./channelModel').model

function * getPublicChannels (query, limit, skip) {
  return Channel.find({ public: true, name: new RegExp(query, 'i') })
    .limit(limit).skip(skip).exec()
}

function * postChannel (channel) {
  const newChannel = new Channel(channel)
  return newChannel.save()
}

function * count (query) {
  return Channel.count({ public: true, name: new RegExp(query, 'i') }).exec()
}

exports.getPublicChannels = getPublicChannels
exports.postChannel = postChannel
exports.count = count
