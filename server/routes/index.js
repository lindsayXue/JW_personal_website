const express = require('express')
var router = express.Router()

const profileRouter = require('./profile')

// Profile routes
router.use('/profile', profileRouter)

module.exports = router
