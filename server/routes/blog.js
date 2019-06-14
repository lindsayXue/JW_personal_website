const express = require('express')
const router = express.Router()

const Blog = require('../models/Blog')

const { check, validationResult } = require('express-validator/check')

// @route    GET api/blog
// @desc     Get blog
// @access   Public
router.get('/', async (req, res) => {
  try {
    const blog = await Blog.findOne({})
    res.json(blog)
  } catch (e) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
