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
    check('email', 'Invalid email').isEmail(),
    check('city', 'City is required').custom((value, { req }) => {
      if (!req.body.location.city) {
        return false
      }
      return true
    }),
    check('country', 'Country is required').custom((value, { req }) => {
      if (!req.body.location.country) {
        return false
      }
      return true
    }),
    check('imgURL', 'Image URL is required')
      .not()
      .isEmpty(),
    check('facebook', 'Facebook is required').custom((value, { req }) => {
      if (!req.body.socialLinks.facebook) {
        return false
      }
      return true
    }),
    check('linkedin', 'LinkedIn is required').custom((value, { req }) => {
      if (!req.body.socialLinks.linkedin) {
        return false
      }
      return true
    }),
    check('github', 'Github is required').custom((value, { req }) => {
      if (!req.body.socialLinks.github) {
        return false
      }
      return true
    }),
    check('youtube', 'Youtube is required').custom((value, { req }) => {
      if (!req.body.socialLinks.youtube) {
        return false
      }
      return true
    })
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
        location,
        imgURL,
        socialLinks
      } = req.body

      const newProfile = new Profile({
        firstName,
        lastName,
        currentTitle,
        email,
        location,
        imgURL,
        socialLinks
      })

      await newProfile.save()

      res.json(newProfile)
    } catch (e) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    PUT api/profile
// @desc     Edit sidebar profile
// @access   Admin
router.put(
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
    check('email', 'Invalid email').isEmail(),
    check('city', 'City is required').custom((value, { req }) => {
      if (!req.body.location.city) {
        return false
      }
      return true
    }),
    check('country', 'Country is required').custom((value, { req }) => {
      if (!req.body.location.country) {
        return false
      }
      return true
    }),
    check('imgURL', 'Image URL is required')
      .not()
      .isEmpty(),
    check('facebook', 'Facebook is required').custom((value, { req }) => {
      if (!req.body.socialLinks.facebook) {
        return false
      }
      return true
    }),
    check('linkedin', 'LinkedIn is required').custom((value, { req }) => {
      if (!req.body.socialLinks.linkedin) {
        return false
      }
      return true
    }),
    check('github', 'Github is required').custom((value, { req }) => {
      if (!req.body.socialLinks.github) {
        return false
      }
      return true
    }),
    check('youtube', 'Youtube is required').custom((value, { req }) => {
      if (!req.body.socialLinks.youtube) {
        return false
      }
      return true
    })
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
        location,
        imgURL,
        socialLinks
      } = req.body

      const profile = await Profile.findOne({})

      // Check whether there is a profile
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      await profile.updateOne({
        firstName,
        lastName,
        currentTitle,
        email,
        location,
        imgURL,
        socialLinks
      })

      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

module.exports = router
