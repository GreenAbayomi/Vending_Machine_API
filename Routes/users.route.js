const express = require('express')
const router = express.Router()
const {deposit, delete_, update, details, resetDeposit} = require('../Controllers/users.controller')
const { verifyRoles } = require('../Middleware/auth.middleware')



router.route('/')
.get(details)
.put(update)
.delete(delete_)


router.route('/deposit')
.put(verifyRoles("buyer"), deposit)
.patch(verifyRoles("buyer"), resetDeposit)


module.exports = router