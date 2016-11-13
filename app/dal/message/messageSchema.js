'use strict'

const ONE_DAY = 24 * 60 * 60000

const Mongoose = require('mongoose')

const schema = Mongoose.Schema({
  channel: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  senderAvatar: {
    type: String
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  expireAt: {
    type: Date,
    validate: [(v) => {
      return (v - new Date()) <= ONE_DAY
    }, 'Cannot expire more than 1 day in the future.' ],
    default: () => {
      return new Date(new Date().valueOf() + ONE_DAY)
    }
  }
})

schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })

exports.schema = schema
