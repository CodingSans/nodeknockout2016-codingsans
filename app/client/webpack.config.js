const _ = require('lodash')
const dev = require('./config/webpack.dev.js')
const prod = require('./config/webpack.prod.js')
module.exports = _.assign(dev, prod);
