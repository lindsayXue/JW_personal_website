const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')

const { check, validationResult } = require('express-validator/check')

// @route    GET api/profile
// @desc     Get profile
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne({})
    res.json(profile)
  } catch (e) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/profile
// @desc     Create profile
// @access   Admin
router.post(
  '/',
  [
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty(),
    check('currentTitle', 'Current title is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required')
      .not()
      .isEmpty(),
    check('city', 'City is required')
      .not()
      .isEmpty(),
    check('country', 'Country is required')
      .not()
      .isEmpty(),
    check('imgURL', 'Image URL is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const {
        firstName,
        lastName,
        currentTitle,
        email,
        city,
        country,
        imgURL
      } = req.body

      const newProfile = new Profile({
        firstName,
        lastName,
        currentTitle,
        email,
        location: {
          city,
          country
        },
        imgURL
      })

      await newProfile.save()

      res.json(newProfile)
    } catch (e) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
