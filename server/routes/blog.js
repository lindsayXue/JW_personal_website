const express = require('express')
const router = express.Router()

const Blog = require('../models/Blog')
const BlogCatagory = require('../models/BlogCatagory')

const { check, validationResult } = require('express-validator/check')

// @route    GET api/blog
// @desc     Get all blog
// @access   Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('catagory', 'name')
      .sort({ date: -1 })

    res.json(blogs)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/blog
// @desc     Create blog
// @access   Admin
router.post(
  '/',
  [
    check('blogTitle', 'Blog title is required')
      .not()
      .isEmpty(),
    check('blogContent', 'Blog content is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const newBlog = new Blog({
        title: req.body.blogTitle,
        catagory: req.body.blogCatagory,
        content: req.body.blogContent
      })

      await newBlog.save()
      res.json(newBlog)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    GET api/blog/catagory
// @desc     Get all blog catagory
// @access   Public
router.get('/catagory', async (req, res) => {
  try {
    const catagories = await BlogCatagory.find()
    res.json(catagories)
  } catch (e) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/blog/catagory
// @desc     Create blog catagory
// @access   Admin
router.post(
  '/catagory',
  [
    check('catagoryName', 'Catagory name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const newCatagory = new BlogCatagory({
        name: req.body.catagoryName
      })

      await newCatagory.save()
      res.json(newCatagory)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/blog/catagory
// @desc     Edit blog catagory
// @access   Admin
router.put(
  '/catagory',
  [
    check('catagoryName', 'Catagory name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const { catagoryId, catagoryName } = req.body

      const catagory = await BlogCatagory.findById(catagoryId)

      catagory.name = catagoryName

      await catagory.save()
      res.json(catagory)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    DELETE api/blog/catagory/:id
// @desc     Delete catagory
// @access   Admin
router.delete('/catagory/:id', async (req, res) => {
  try {
    const catagory = await BlogCatagory.findById(req.params.id)

    // Make sure project exists
    if (!catagory) {
      return res.status(404).json({ msg: 'Catagory does not exist' })
    }

    await catagory.deleteOne()

    // Delete all related blogs catagory
    await Blog.updateMany(
      { catagory: req.params.id },
      { $unset: { catagory: 1 } }
    )

    res.json({ msg: 'Post removed' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    GET api/blog/:id
// @desc     Get a blog
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id)
      .populate('catagory', 'name')
      .sort({ date: -1 })

    res.json(blogs)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    PUT api/blog
// @desc     Edit blog
// @access   Admin
router.put(
  '/',
  [
    check('blogTitle', 'Blog title is required')
      .not()
      .isEmpty(),
    check('blogContent', 'Blog content is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const { id, blogTitle, blogCatagory, blogContent } = req.body

      const blog = await Blog.findByIdAndUpdate(id, {
        $set: {
          titl: blogTitle,
          catagory: blogCatagory,
          content: blogContent
        }
      })

      res.json(blog)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
