'use strict'

const path = require('path')
const koaRouter = require('koa-router')

const serve = require('koa-static')
const historyApiFallback = require('koa-connect-history-api-fallback')

const config = require('../config/config')

function * init () {
  if (config.client.prebuilded) {
    return yield initProd()
  }
  return yield initDev()
}

function * initDev () {
  const router = koaRouter()

  router.get('/', historyApiFallback({
    verbose: false
  }))

  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config.js').dev()
  const webpackDev = require('koa-webpack-dev-middleware')

  const compiler = webpack(webpackConfig)
  router.get('/', webpackDev(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  return router
}

function * initProd () {
  const router = koaRouter()

  router.get('/', historyApiFallback({
    verbose: false
  }))

  // last serve assets
  router.get('/', serve(path.join(__dirname, '/build')))

  return router
}

module.exports.init = init
