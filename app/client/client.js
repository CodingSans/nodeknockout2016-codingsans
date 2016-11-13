'use strict'

const path = require('path')

const koa = require('koa')
const serve = require('koa-static')
const historyApiFallback = require('koa-connect-history-api-fallback')

const config = require('../config/config')

function * init () {
  if (config.client.prebuilded) {
    return yield initProd()
  }
  return yield initDev()
}

function * builder () {
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js').prod()
  return yield new Promise((res, rej) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return rej(err);
      }
      return res(stats);
    })
  })
}

function * initDev () {
  const app = koa()

  app.use(historyApiFallback({
    verbose: false
  }))

  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js').dev()
  const webpackDev = require('koa-webpack-dev-middleware')

  const compiler = webpack(webpackConfig)
  app.use(webpackDev(compiler, {
    noInfo: true,
    quiet: config.client.quietWebpack,
    publicPath: webpackConfig.output.publicPath
  }))

  return app
}

function * initProd () {
  const app = koa()

  app.use(historyApiFallback({
    verbose: false
  }))

  // last serve assets
  const buildPath = path.join(__dirname, '/build')
  app.use(serve(buildPath))

  return app
}

module.exports.init = init
module.exports.builder = builder
