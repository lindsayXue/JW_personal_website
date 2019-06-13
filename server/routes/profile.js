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
      .isEmpty(),
    check('facebook', 'Facebook is required')
      .not()
      .isEmpty(),
    check('linkedin', 'LinkedIn is required')
      .not()
      .isEmpty(),
    check('github', 'GitHub is required')
      .not()
      .isEmpty(),
    check('youtube', 'Youtube is required')
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
        imgURL,
        facebook,
        linkedin,
        github,
        youtube
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
        imgURL,
        socialLinks: {
          facebook,
          linkedin,
          github,
          youtube
        }
      })

      await newProfile.save()

      res.json(newProfile)
    } catch (e) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/profile/name
// @desc     Edit profile name
// @access   Admin
router.put(
  '/name',
  [
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const { firstName, lastName } = req.body

      let profile = await Profile.findOne({})

      // Check whether there is a profile
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      profile.firstName = firstName
      profile.lastName = lastName

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/profile/currentTitle
// @desc     Edit profile current title
// @access   Admin
router.put(
  '/currentTitle',
  [
    check('currentTitle', 'Current title is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const { currentTitle } = req.body

      let profile = await Profile.findOne({})

      // Check whether there is a profile
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      profile.currentTitle = currentTitle

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/profile/email
// @desc     Edit profile email
// @access   Admin
router.put(
  '/email',
  [
    check('email', 'Email is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const { email } = req.body

      let profile = await Profile.findOne({})

      // Check whether there is a profile
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      profile.email = email

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/profile/location
// @desc     Edit profile location
// @access   Admin
router.put(
  '/location',
  [
    check('location.city', 'City is required')
      .not()
      .isEmpty(),
    check('location.country', 'Country is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    try {
      const { location } = req.body

      let profile = await Profile.findOne({})

      // Check whether there is a profile
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      profile.location = location

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
