const express = require('express')
const router = express.Router()

const Layout = require('../models/Layout')

const { check, validationResult } = require('express-validator/check')

// @route    GET api/layout
// @desc     Get layout
// @access   Public
router.get('/', async (req, res) => {
  try {
    const layout = await Layout.findOne({})
    res.json(layout)
  } catch (e) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/home
// @desc     Create/Edit home desc
// @access   Admin
router.post('/home', async (req, res) => {
  try {
    const { description } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        description
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.homeDesc = description
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/research
// @desc     Create/Edit research desc
// @access   Admin
router.post('/research', async (req, res) => {
  try {
    const { description } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        description
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.researchDesc = description
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/publications
// @desc     Create/Edit publications desc
// @access   Admin
router.post('/publications', async (req, res) => {
  try {
    const { description } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        description
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.publicationsDesc = description
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/blog
// @desc     Create/Edit blog desc
// @access   Admin
router.post('/blog', async (req, res) => {
  try {
    const { description } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        description
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.blogDesc = description
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/contact
// @desc     Create/Edit contact desc
// @access   Admin
router.post('/contact', async (req, res) => {
  try {
    const { description } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        description
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.contactDesc = description
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/footer
// @desc     Create/Edit footer
// @access   Admin
router.post('/footer', async (req, res) => {
  try {
    const { footer } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        footer
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.footer = footer
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/layout/contactimg
// @desc     Create/Edit contact image
// @access   Admin
router.post('/contactimg', async (req, res) => {
  try {
    const { contactImg } = req.body
    const layout = await Layout.findOne({})
    if (!layout) {
      const newLayout = new Layout({
        contactImg
      })
      await newLayout.save()
      return res.json(newLayout)
    }
    layout.contactImgURL = contactImg
    await layout.save()
    res.json(layout)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
