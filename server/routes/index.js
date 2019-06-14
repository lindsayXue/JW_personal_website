const express = require('express')
var router = express.Router()

const profileRouter = require('./profile')

const layoutRouter = require('./layout')

// Profile routes
router.use('/profile', profileRouter)

// Layout routes
router.use('/layout', layoutRouter)

module.exports = router
