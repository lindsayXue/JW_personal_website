const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Blog = new Schema({
  title: {
    type: String,
    required: true
  },
  catagory: {
    type: Schema.Types.ObjectId,
    ref: 'blogCatagory'
  },
  date: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String
  },
  comments: [
    {
      user: String,
      comment: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

module.exports = Team = mongoose.model('blog', Blog)
