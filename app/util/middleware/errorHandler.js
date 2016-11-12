'use strict'

const _ = require('lodash')
const Boom = require('boom')

function * errorHandler (next) {
  try {
    yield next
  } catch (_err) {
    const err = getError(_err)

    const output = err.output

    this.status = output.statusCode
    this.body = output.payload

    _.forEach(output.headers, (value, key) => this.set(key, value))

    this.app.emit('error', err, this)
  }
}

function getError (err) {
  return Boom.wrap(err)
}

module.exports.errorHandler = errorHandler
