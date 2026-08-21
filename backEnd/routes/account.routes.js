const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware.js')
const {getAccount, createAccount, getAccountById, updateAccount, deleteAccount} = require ('../controller/account.controller.js');


router.post('/',auth,createAccount);
router.get('/',auth,getAccount);
router.get('/:id',auth,getAccountById);
router.put('/:id',auth,updateAccount);
router.delete('/:id',auth,deleteAccount);

module.exports = router;