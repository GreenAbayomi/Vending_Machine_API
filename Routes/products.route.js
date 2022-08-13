const express = require('express')
const { createProduct, updateProduct, deleteProduct, getProducts, buyProduct } = require('../Controllers/products.controller')
const { userRequired, sellerRequired, buyerRequired } = require('../Middleware/auth.middleware')
const router = express.Router()


router.get('/', getProducts)
router.post('/', userRequired,sellerRequired, createProduct)
router.put('/:productId', userRequired,sellerRequired, updateProduct)
router.delete('/:productId', userRequired,sellerRequired, deleteProduct)
router.post('/buy', userRequired,buyerRequired, buyProduct)




module.exports = router