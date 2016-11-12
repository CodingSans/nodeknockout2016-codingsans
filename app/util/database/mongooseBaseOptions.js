function baseOptionsPlugin (schema) {
  schema.set('timestamps', true)
  schema.set('versionKey', false)
  schema.set('toJSON', {
    virtuals: true
  })
  schema.set('toObject', {
    virtuals: true
  })
}

exports.baseOptionsPlugin = baseOptionsPlugin
