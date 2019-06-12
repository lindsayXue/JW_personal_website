const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Contact = new Schema({
  imgURL: {
    type: String,
    required: true
  }
})

module.exports = Team = mongoose.model('contact', Contact)
