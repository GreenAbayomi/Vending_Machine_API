const express = require('express')
const { userRequired } = require('../Middleware/auth.middleware')
const rootRouter = express.Router()


const auth = require('./auth.route')
const products = require('./products.route')
const users = require('./users.route')


rootRouter.use('/auth', auth)
rootRouter.use('/users', userRequired, users)
rootRouter.use('/products', products)


module.exports = rootRouter