const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { Restaurant} = require('./models')
const { errorWrap} = require('./utils')
const cors = require('cors')
var XLSX = require('xlsx')

mongoose.connect(process.env.MONGO_URL)
mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello world')
})


app.listen(8080, async () => console.log('Server listening on port 8080!'))

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message)
})
