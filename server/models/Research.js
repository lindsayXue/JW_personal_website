const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Research = new Schema({
  researchDesc: {
    type: String,
    required: true
  },
  interests: [
    {
      type: String
    }
  ],
  projects: [
    {
      name: {
        type: String,
        required: true
      },
      detail: {
        type: String,
        required: true
      },
      imgURL: {
        type: String
      }
    }
  ]
})

module.exports = Team = mongoose.model('research', Research)
