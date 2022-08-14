const express = require('express')
const { createProduct, updateProduct, deleteProduct, getProducts, buyProduct } = require('../Controllers/products.controller')
const { userRequired, verifyRoles } = require('../Middleware/auth.middleware')
const router = express.Router()


router.get('/', getProducts)
router.post('/', userRequired,verifyRoles("seller"), createProduct)
router.put('/:productId', userRequired,verifyRoles("seller"), updateProduct)
router.delete('/:productId', userRequired, verifyRoles("seller"), deleteProduct)
router.post('/buy', userRequired, verifyRoles("buyer"), buyProduct)


module.exports = router