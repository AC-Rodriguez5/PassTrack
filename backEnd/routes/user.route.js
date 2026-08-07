const express = require('express');
const router = express.Router();
const {getUser, getUserById, registerUser, updateUser, deleteUser} = require('../controller/passTrack.controller.js')

//create
router.post('/register', registerUser   );
//get all user
router.get('/', getUser);
//get user by id
router.get('/:id', getUserById);
//update
router.put('/:id', updateUser);
//delete
router.delete('/:id', deleteUser);

module.exports = router;