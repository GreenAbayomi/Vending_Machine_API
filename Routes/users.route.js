const express = require('express')
const userRouter = express.Router()
const {deposit, delete_, update, details, resetDeposit} = require('../Controllers/users.controller')
const { buyerRequired } = require('../Middleware/auth.middleware')



userRouter.route('/').get(details).post(update).delete(delete_)

userRouter.put('/deposit',buyerRequired, deposit)

userRouter.post('/deposit', buyerRequired, deposit)

userRouter.patch('/reset',buyerRequired, resetDeposit)






module.exports = userRouter