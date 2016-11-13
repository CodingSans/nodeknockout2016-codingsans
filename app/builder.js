const co = require('co')
const clientServer = require('./client/client')

const build = co.wrap(function * build() {
  yield clientServer.builder()
});

build().catch((err) => setTimeout(() => { throw err }))
