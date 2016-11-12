'use strict'

const ONE_DAY = 24 * 60 * 60

const mongoose = require('../db')

const schema = mongoose.Schema({
  name: String,
  public: {
    type: Boolean,
    default: false
  },
  lastMessageDate: {
    type: Date,
    default: new Date(),
    expires: ONE_DAY
  }
})

exports.schema = schema
