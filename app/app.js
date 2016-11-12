'use strict'

const express = require('express')

const config = require('./config/config.js')
const db = require('./dal/db.js')

const app = express()

db.start().then(() => {
  console.log('MongoDB connection estabilished.')

  app.set('port', config.server.port)

  app.get('/', function (request, response) {
    response.send('Hello from Node Knockout 2016 CodingSans!')
  })

  app.listen(app.get('port'), function () {
    console.log(`Node app is running at localhost: ${app.get('port')}.`)
  })
})
