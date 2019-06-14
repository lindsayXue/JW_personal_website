const express = require('express')
var router = express.Router()

const profileRouter = require('./profile')

const layoutRouter = require('./layout')

const blogRouter = require('./blog')

// Profile routes
router.use('/profile', profileRouter)

// Layout routes
router.use('/layout', layoutRouter)

// Layout routes
router.use('/blog', blogRouter)

module.exports = router
