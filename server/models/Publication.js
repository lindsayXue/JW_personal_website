const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Publication = new Schema({
  title: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  },
  authors: [{ type: String }],
  info: {
    type: String
  },
  Year: {
    type: Number
  }
})

module.exports = Team = mongoose.model('publication', Publication)
