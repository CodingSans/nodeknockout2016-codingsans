'use strict'

const Mongoose = require('mongoose')

const config = require('../config/config')
const { baseOptionsPlugin } = require('../util/database/mongooseBaseOptions')

Mongoose.Promise = Promise

Mongoose.plugin(baseOptionsPlugin)

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
