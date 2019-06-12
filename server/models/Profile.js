const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Profile = new Schema({
  Name: {
    type: String,
    required: true
  },
  currentTitle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  location: [
    {
      city: String,
      country: String
    }
  ],
  imgURL: {
    type: String,
    required: true
  }
})

module.exports = Team = mongoose.model('profile', Profile)
