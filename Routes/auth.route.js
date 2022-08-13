const express = require('express')
const { register, login } = require('../Controllers/auth.controller')
const router = express.Router()


router.post('/register' , register)
router.post('/login' , login)
router.post('/logout')
router.post('/refreshToken')









module.exports = router