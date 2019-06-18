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
        catagory: req.body.blogCatagory ? req.body.blogCatagory : null,
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

// @route    DELETE api/blog/:id
// @desc     delete a blog
// @access   Admin
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    await blog.remove()

    res.json(blog)
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
      const { id, blogTitle, blogContent } = req.body
      const blog = await Blog.findById(id)

      if (!req.body.blogCatagory) {
        await blog.updateOne({
          $set: {
            title: blogTitle,
            content: blogContent
          }
        })
        return res.json(blog)
      }

      await blog.updateOne({
        $set: {
          title: blogTitle,
          catagory: req.body.blogCatagory,
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

// @route    POST api/blog/comment
// @desc     Add a blog
// @access   Admin
router.post(
  '/comment',
  [
    check('comment', 'Comment is required')
      .not()
      .isEmpty(),
    check('commentName', 'Name content is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const { id, comment, commentName } = req.body
      const blog = await Blog.findById(id)

      if (!blog) {
        return res.status(404).json({ msg: 'Blog does not exist' })
      }

      blog.comments.unshift({
        user: commentName,
        comment
      })

      await blog.save()

      res.json(blog)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    DELETE api/blog/comment/:blogid/:commentid
// @desc     Delete a blog
// @access   Admin
router.delete('/comment/:blogid/:commentid', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogid)
    if (!blog) {
      return res
        .status(400)
        .json({ errors: { noBlog: { msg: 'No blog found' } } })
    }

    const comment = blog.comments.find(
      item => item._id.toString() === req.params.commentid
    )

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }

    const removeIndex = blog.comments
      .map(item => item._id.toString())
      .indexOf(req.params.commentid)

    if (removeIndex < 0) {
      return res.status(404).json({ msg: 'Something wrong' })
    }

    blog.comments.splice(removeIndex, 1)

    await blog.save()

    res.json(blog)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
