'use strict'

const { mongoose } = require('../db')
const { schema } = require('./channelSchema')

const name = 'Channel'

const model = mongoose.model(name, schema)

exports.name = name
exports.model = model
