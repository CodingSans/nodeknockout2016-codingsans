const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const helpers = require('./helpers')
const path = require('path')
const config = require('../../config/config')

module.exports.prod = () => ({
  context: path.join(__dirname, '..'),

  entry: {
    'polyfills': path.resolve(__dirname, '../src/polyfills.ts'),
    'vendor': path.resolve(__dirname, '../src/vendor.ts'),
    'app': path.resolve(__dirname, '../src/main.ts')
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  output: {
    path: './app/client/build',
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      title: 'Dstruct',
      maps_api: config.client.mapsApi,
      template: path.join(__dirname, '../src/indexTemplate.ejs'),
      inject: 'body'
    })
  ]
})
