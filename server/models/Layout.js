const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const Layout = new Schema({
  homeDesc: String,
  researchDesc: String,
  applicationsDesc: String,
  blogDesc: String,
  contactDesc: String,
  footer: String,
  imgContactURL: String
})

module.exports = Team = mongoose.model('layout', Layout)
