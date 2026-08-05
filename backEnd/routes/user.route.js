const express = require('express');
const router = express.Router();
const {getUser, getUserById, createUser, updateUser, deleteUser} = require('../controller/passTrack.controller.js')


//get all user
router.get('/', getUser);
//get user by id
router.get('/:id', getUserById);
//create
router.post('/', createUser);
//update
router.put('/:id', updateUser);
//delete
router.delete('/:id', deleteUser);