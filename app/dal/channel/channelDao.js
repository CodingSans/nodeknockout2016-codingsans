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

function * getChannelById (channelId) {
  return Channel.find({ _id: channelId }).exec()
}

function * getChannelByName (channelName) {
  return Channel.find({ name: channelName }).exec()
}

function * count (query) {
  return Channel.count({ public: true, name: new RegExp(query, 'i') }).exec()
}

exports.getPublicChannels = getPublicChannels
exports.postChannel = postChannel
exports.getChannelById = getChannelById
exports.getChannelByName = getChannelByName
exports.count = count
