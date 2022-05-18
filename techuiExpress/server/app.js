const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const authRoutes = require('./routes/auth.routes')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', authRoutes)

module.exports = app
