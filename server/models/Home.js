const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const HomeSchema = new Schema({
  about: {
    type: String,
    required: true
  },
  education: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      school: {
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
      ]
    }
  ],
  experience: [
    {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      company: {
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
      ]
    }
  ]
})

module.exports = Team = mongoose.model('home', HomeSchema)
