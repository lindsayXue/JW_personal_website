const express = require('express')
const router = express.Router()

const Admin = require('../models/Admin')

// Middleware
const adminAuth = require('../middlewares/adminAuth')

const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator/check')

// @route    POST api/admin/login
// @desc     Login Admin
// @access   Public
router.post(
  '/login',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const { username, password } = req.body

      const admin = await Admin.findOne({ username })
      if (!admin) {
        return res
          .status(404)
          .json({ errors: { username: { msg: 'Username not found' } } })
      }

      // Check Password
      const isMatch = await bcrypt.compare(password, admin.password)

      if (!isMatch) {
        return res
          .status(404)
          .json({ errors: { password: { msg: 'Password incorrect' } } })
      }

      // Sign JWT Token
      const payload = {
        user: {
          id: admin._id
        }
      }
      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600 // 24 hours
      })
      res.json({ succedd: true, token })
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    POST api/admin/register
// @desc     Register Admin
// @access   Public
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })

    if (admin) {
      errors.username = 'Username already existes'
      return res.status(404).json(errors)
    }

    const newAdmin = new Admin({
      username,
      password
    })

    await newAdmin.save()

    res.json(newAdmin)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
