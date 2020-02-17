/* eslint-disable prettier/prettier */
const winston = require('./config/winston')
const indexRouter = require('./routes/index')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const express = require('express')

mongoose.connect('mongodb://localhost:27017/rmutt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
const db = mongoose.connection
db.on('error', () => {
  console.log('connect error')
})
db.once('open', function() {
  console.log('db connected')
})

const app = express()

app.use(morgan('combined', { stream: winston.stream }))
app.use(bodyParser.json())
app.use(cors())
app.use('/', indexRouter)
app.use('/avatar', express.static('./avatar'))
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = err

  // add this line to include winston logging
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
    req.method
    } - ${req.ip}`
  )

  // render the error page
  res.sendStatus(err.status || 500)
})

export default {
  path: '/api',
  handler: app
}
