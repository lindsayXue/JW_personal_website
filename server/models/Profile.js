const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Profile = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    }
  ],
  imgURL: {
    type: String,
    required: true
  }
})

module.exports = Team = mongoose.model('profile', Profile)
