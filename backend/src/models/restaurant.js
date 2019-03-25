const mongoose = require('mongoose')

const Restaurant = new mongoose.Schema({
  name: { type: String, require: true },
  
})

module.exports = mongoose.model('Restaurant', Restaurant)
