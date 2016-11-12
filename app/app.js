const express = require('express')

const config = require('./config/config.js')
const db = require('./dal/db.js')

const app = express()

db.start().then(() => {
  const connectionString = `${config.mongo.host}:${config.mongo.port}/${config.mongo.name}`
  console.log(`MongoDB connection estabilished at ${connectionString}`)

  app.set('port', config.server.port)

  app.get('/', function (request, response) {
    response.send('Hello from Node Knockout 2016 CodingSans!')
  })

  app.listen(app.get('port'), function () {
    console.log(`Node app is running at localhost: ${app.get('port')}`)
  })
})
