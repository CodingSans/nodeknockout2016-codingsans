const Mongoose = require('mongoose')

const config = require('../config/config.js')

Mongoose.Promise = Promise

const mongoose = Mongoose.createConnection()

function start () {
  return mongoose.open(
    config.mongo.host,
    config.mongo.name,
    config.mongo.port,
    {
      user: config.mongo.user,
      pass: config.mongo.password,
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
