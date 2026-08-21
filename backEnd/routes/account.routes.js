const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js')
const {getAccount, createAccount, getAccountById, updateAccount, deleteAccount} = require ('../controller/account.controller.js');

const {authLimiter} = require('../middleware/limites.middleware.js');

router.post('/',authLimiter,auth,createAccount);
router.get('/',authLimiter,auth,getAccount);
router.get('/:id',authLimiter,auth,getAccountById);
router.put('/:id',authLimiter,auth,updateAccount);
router.delete('/:id',authLimiter,auth,deleteAccount);

module.exports = router;