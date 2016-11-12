const _ = require('lodash')

const { start, mongoose } = require('../../dal/db')

exports.initDatabase = _.once(start)

function * clearAllDb () {
  yield mongoose.db.dropDatabase()
}

exports.clearAllDb = clearAllDb
