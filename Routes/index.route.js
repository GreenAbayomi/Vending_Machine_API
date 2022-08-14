const express = require('express')
const { userRequired } = require('../Middleware/auth.middleware')
const routes = express.Router()


const auth = require('./auth.route')
const products = require('./products.route')
const users = require('./users.route')


routes.use('/auth', auth)
routes.use('/users', userRequired, users)
routes.use('/products', products)


module.exports = routes
