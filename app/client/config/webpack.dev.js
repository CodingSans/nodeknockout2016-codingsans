var webpack = require('webpack');
require('awesome-typescript-loader');
require('angular2-template-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');

module.exports.dev = () => ({
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
    path: '/dist',
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
      title: 'DStruct',
      template: path.join(__dirname, '../src/indexTemplate.ejs'),
      inject: 'body',
    }),
  ]
});
