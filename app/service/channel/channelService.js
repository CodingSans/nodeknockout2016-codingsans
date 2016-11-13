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

exports.getPublicChannels = getPublicChannels
exports.createChannel = createChannel
