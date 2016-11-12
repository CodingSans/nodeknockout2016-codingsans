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
      default: 5000,
      env: 'PORT'
    }
  },
  mongo: {
    connectionString: {
      format: String,
      default: 'mongodb://localhost:27017/',
      env: 'MONGO_CONNECTION_STRING'
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
