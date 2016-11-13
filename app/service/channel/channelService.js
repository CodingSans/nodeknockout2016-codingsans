const ChannelDao = require('../../dal/channel/channelDao')

function * getPublicChannels (query, limit, skip) {
  const count = yield ChannelDao.count(query)
  const publicChannels = yield ChannelDao.getPublicChannels(query, limit, skip)
  return { data: publicChannels, count }
}

function * createChannel (channel) {
  const created = yield ChannelDao.postChannel(channel)
  return created
}

function * getChannelByName (channelName) {
  const channel = yield ChannelDao.getChannelByName(channelName)
  return channel
}

function * getChannelById (channelId) {
  const channel = yield ChannelDao.getChannelById(channelId)
  return channel
}

exports.getPublicChannels = getPublicChannels
exports.createChannel = createChannel
exports.getChannelByName = getChannelByName
exports.getChannelById = getChannelById
