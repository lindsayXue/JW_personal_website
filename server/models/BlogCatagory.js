const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BlogCatagory = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = Team = mongoose.model('blogCatagory', BlogCatagory)
