const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js')
const {getAccount, createAccount, getAccountById, updateAccount, deleteAccount} = require ('../controller/account.controller.js');

const {authLimiter} = require('../middleware/limites.middleware.js');

router.post('/',auth,authLimiter,createAccount);
router.get('/',auth,authLimiter,getAccount);
router.get('/:id',auth,authLimiter,getAccountById);
router.put('/:id',auth,authLimiter,updateAccount);
router.delete('/:id',auth,authLimiter,deleteAccount);

module.exports = router;