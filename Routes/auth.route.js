const express = require('express')
const { register, login } = require('../Controllers/auth.controller')
const authRouter = express.Router()


authRouter.post('/register' , register)
authRouter.post('/login' , login)
authRouter.post('/logout')
authRouter.post('/refreshToken')









module.exports = authRouter