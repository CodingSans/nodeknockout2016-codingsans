'use strict'

const Mongoose = require('mongoose')

const config = require('../config/config.js')

Mongoose.Promise = Promise

const mongoose = Mongoose.createConnection()

function start () {
  return mongoose.open(
    config.mongo.connectionString,
    {
      server: {
        socketOptions: {
          keepAlive: 300000,
          connectTimeoutMS: 30000
        }
      }
    }
  )
}

exports.mongoose = mongoose
exports.start = start
