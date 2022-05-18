const express = require('express')
const { login, payment, checkpay } = require('../controllers/auth.controller')
const router = express()

// api/auth/login
router.post('/login', login)
router.post('/pay', payment)
router.post('/checkpay', checkpay)

module.exports = router
