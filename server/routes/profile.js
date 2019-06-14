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

// @route    POST api/profile/aboutme
// @desc     Create/Edit about me
// @access   Admin
router.post('/aboutme', async (req, res) => {
  try {
    const profile = await Profile.findOne({})
    if (!profile) {
      return res
        .status(400)
        .json({ errors: { noProfile: { msg: 'No profile yet' } } })
    }

    profile.aboutme = req.body.content
    await profile.save()

    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/profile/aboutresearch
// @desc     Create/Edit about research
// @access   Admin
router.post('/aboutresearch', async (req, res) => {
  try {
    const profile = await Profile.findOne({})
    if (!profile) {
      return res
        .status(400)
        .json({ errors: { noProfile: { msg: 'No profile yet' } } })
    }

    profile.aboutresearch = req.body.content
    await profile.save()

    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    POST api/profile/education
// @desc     Create/Edit education
// @access   Admin
router.post(
  '/education',
  [
    check('start', 'Education start date is required')
      .not()
      .isEmpty(),
    check('end', 'Education end date is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('school', 'School is required')
      .not()
      .isEmpty(),
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
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const profile = await Profile.findOne({})
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      const { start, end, degree, school, location } = req.body

      profile.education.unshift({ start, end, degree, school, location })

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    POST api/profile/experience
// @desc     Create/Edit experience
// @access   Admin
router.post(
  '/experience',
  [
    check('start', 'Experience start date is required')
      .not()
      .isEmpty(),
    check('end', 'Experience end date is required')
      .not()
      .isEmpty(),
    check('degree', 'Position is required')
      .not()
      .isEmpty(),
    check('school', 'Company is required')
      .not()
      .isEmpty(),
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
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    try {
      const profile = await Profile.findOne({})
      if (!profile) {
        return res
          .status(400)
          .json({ errors: { noProfile: { msg: 'No profile yet' } } })
      }

      const { start, end, degree, school, location } = req.body

      profile.experience.unshift({
        start,
        end,
        position: degree,
        company: school,
        location
      })

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.log(err)
      res.status(500).json({ errors: { server: { msg: 'Server error' } } })
    }
  }
)

// @route    DELETE api/profile/education/:id
// @desc     Delete education
// @access   Admin
router.delete('/education/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({})

    if (!profile) {
      return res
        .status(400)
        .json({ errors: { noProfile: { msg: 'No profile yet' } } })
    }

    const education = profile.education.find(
      item => item._id.toString() === req.params.id
    )

    // Make sure education exists
    if (!education) {
      return res.status(404).json({ msg: 'Education does not exist' })
    }

    const removeIndex = profile.education
      .map(item => item._id.toString())
      .indexOf(req.params.id)

    if (removeIndex < 0) {
      return res.status(404).json({ msg: 'Something wrong' })
    }

    profile.education.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

// @route    DELETE api/profile/experience/:id
// @desc     Delete experience
// @access   Admin
router.delete('/experience/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({})

    if (!profile) {
      return res
        .status(400)
        .json({ errors: { noProfile: { msg: 'No profile yet' } } })
    }

    const experience = profile.experience.find(
      item => item._id.toString() === req.params.id
    )

    // Make sure experience exists
    if (!experience) {
      return res.status(404).json({ msg: 'Education does not exist' })
    }

    const removeIndex = profile.experience
      .map(item => item._id.toString())
      .indexOf(req.params.id)

    if (removeIndex < 0) {
      return res.status(404).json({ msg: 'Something wrong' })
    }

    profile.experience.splice(removeIndex, 1)

    await profile.save()
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: { server: { msg: 'Server error' } } })
  }
})

module.exports = router
