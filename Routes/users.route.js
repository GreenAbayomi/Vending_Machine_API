const express = require('express')
const router = express.Router()
const {deposit, delete_, update, details, resetDeposit} = require('../Controllers/users.controller')
const { buyerRequired } = require('../Middleware/auth.middleware')



router.get('/', details)

router.post('/', update)

router.delete('/', delete_)

router.put('/deposit',buyerRequired, deposit)

router.post('/deposit', buyerRequired, deposit)

router.patch('/reset',buyerRequired, resetDeposit)






module.exports = router