const bunyan = require('bunyan')

const config = require('../config/config')

const streams = []

if (config.logging.console.enabled) {
  streams.push({
    level: config.logging.console.level,
    stream: process.stdout
  })
}

if (config.logging.syslog.enabled) {
  const bsyslog = require('bunyan-syslog')

  streams.push({
    level: config.logging.syslog.level,
    type: 'raw',
    stream: bsyslog.createBunyanStream({
      type: config.logging.syslog.type,
      facility: bsyslog.local0,
      host: config.logging.syslog.host,
      port: config.logging.syslog.port
    })
  })
}

const logger = bunyan.createLogger({
  name: 'codingsans.dstruct',
  serializers: bunyan.stdSerializers,
  streams
})

module.exports = logger
