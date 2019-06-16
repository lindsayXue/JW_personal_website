const express = require('express')
var router = express.Router()

const profileRouter = require('./profile')

const layoutRouter = require('./layout')

const blogRouter = require('./blog')

const adminRouter = require('./admin')

// Profile routes
router.use('/profile', profileRouter)

// Layout routes
router.use('/layout', layoutRouter)

// Blog routes
router.use('/blog', blogRouter)

// Admin routes
router.use('/admin', adminRouter)

module.exports = router
