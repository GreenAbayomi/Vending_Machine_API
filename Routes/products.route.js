const express = require('express')
const { createProduct, updateProduct, deleteProduct, getProducts, buyProduct } = require('../Controllers/products.controller')
const { userRequired, sellerRequired, buyerRequired } = require('../Middleware/auth.middleware')
const productRouter = express.Router()


productRouter.get('/', getProducts)
productRouter.post('/', userRequired,sellerRequired, createProduct)
productRouter.put('/:productId', userRequired,sellerRequired, updateProduct)
productRouter.delete('/:productId', userRequired,sellerRequired, deleteProduct)
productRouter.post('/buy', userRequired,buyerRequired, buyProduct)



















module.exports = {productRouter}