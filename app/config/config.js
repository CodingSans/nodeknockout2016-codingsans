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
    doc: 'The applicaton environment.',
    format: ['production', 'develop', 'test'],
    default: 'develop',
    env: 'NODE_ENV',
    arg: 'env'
  },
  server: {
    port: {
      format: 'port',
      default: 3000,
      env: 'PORT'
    }
  },
  mongo: {
    user: {
      format: String,
      default: '',
      env: 'MONGO_USER'
    },
    password: {
      format: String,
      default: '',
      env: 'MONGO_PASSWORD'
    },
    host: {
      format: String,
      default: 'localhost',
      env: 'MONGO_HOST'
    },
    port: {
      format: 'port',
      default: 27017,
      env: 'MONGO_PORT'
    },
    name: {
      format: String,
      default: '',
      env: 'MONGO_NAME'
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
