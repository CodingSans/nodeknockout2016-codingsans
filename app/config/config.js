'use strict'

const path = require('path')
const convict = require('convict')
const dotenv = require('dotenv')

dotenv.config({
  silent: true
})

dotenv.config({
  silent: true,
  path: `.env.${process.env.NODE_ENV || 'develop'}`
})

const conf = convict({
  env: {
    format: ['production', 'develop', 'test'],
    default: 'develop',
    env: 'NODE_ENV'
  },
  sessionKey: {
    format: String,
    default: 'dstruct.session.key',
    env: 'SESSION_SECRET_KEY'
  },
  server: {
    port: {
      format: 'port',
      default: 5000,
      env: 'PORT'
    },
    protocol: {
      format: ['http', 'https'],
      default: 'http',
      env: 'SERVER_PROTOCOL'
    },
    host: {
      format: String,
      default: 'localhost:5000',
      env: 'SERVER_HOST'
    }
  },
  mongo: {
    connectionString: {
      format: String,
      default: 'mongodb://localhost:27017/',
      env: 'MONGO_CONNECTION_STRING'
    }
  },
  client: {
    prebuilded: {
      format: Boolean,
      default: false,
      env: 'CLIENT_PREBUILDED'
    },
    quietWebpack: {
      format: Boolean,
      default: true,
      env: 'CLIENT_QUIET_WEBPACK'
    },
    included: {
      debug: {
        format: Boolean,
        default: false,
        env: 'CLIENT_DEBUG'
      }
    },
    mapsApi: {
      format: String,
      default: '',
      env: 'CLIENT_GMAPS_API_KEY'
    }
  },
  logging: {
    console: {
      enabled: {
        format: Boolean,
        default: true,
        env: 'LOGGING_CONSOLE_ENABLE'
      },
      level: {
        format: String,
        default: 'debug',
        env: 'LOGGING_CONSOLE_LEVEL'
      },
      pretty: {
        formal: Boolean,
        default: true,
        env: 'LOGGING_CONSOLE_PRETTY'
      }
    },
    rollbar: {
      enabled: {
        format: Boolean,
        default: false,
        env: 'LOGGING_ROLLBAR_ENABLE'
      },
      level: {
        format: String,
        default: 'warn',
        env: 'LOGGING_ROLLBAR_LEVEL'
      },
      token: {
        format: String,
        default: '',
        env: 'LOGGING_ROLLBAR_TOKEN'
      }
    },
    syslog: {
      enabled: {
        format: Boolean,
        default: false,
        env: 'LOGGING_SYSLOG_ENABLE'
      },
      level: {
        format: String,
        default: 'info',
        env: 'LOGGING_SYSLOG_LEVEL'
      },
      type: {
        format: ['sys', 'tcp', 'udp'],
        default: 'udp',
        env: 'LOGGING_SYSLOG_TYPE'
      },
      host: {
        format: String,
        default: '127.0.0.1',
        env: 'LOGGING_SYSLOG_HOST'
      },
      port: {
        format: 'port',
        default: 514,
        env: 'LOGGING_SYSLOG_PORT'
      }
    }
  },
  oauth: {
    slack: {
      key: {
        format: String,
        default: '',
        env: 'OAUTH_SLACK_KEY'
      },
      secret: {
        format: String,
        default: '',
        env: 'OAUTH_SLACK_SECRET'
      }
    }
  }
})

// Load environment dependent configuration
const env = conf.get('env')
conf.loadFile(path.normalize(`${__dirname}/${env}.json`))

// Perform validation
conf.validate({
  strict: true
})

module.exports = conf.getProperties()
