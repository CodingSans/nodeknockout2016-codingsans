'use strict'

const { mongoose } = require('../db')
const { schema } = require('./messageSchema')

const name = 'Message'

const model = mongoose.model(name, schema)

exports.name = name
exports.model = model
