const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

// Create Schema
const Admin = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

Admin.pre('save', async function(next) {
  try {
    const user = this
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    user.password = hash
    next()
  } catch (err) {
    console.log(err)
  }
})

module.exports = Team = mongoose.model('admin', Admin)
