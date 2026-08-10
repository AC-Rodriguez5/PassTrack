    const express = require('express');
    const router = express.Router();
    const {loginUser, getUserById, registerUser, updateUser, deleteUser} = require('../controller/passTrack.controller.js')

    //create
    router.post('/register', registerUser   );
    //get all user
    router.post('/login', loginUser);
    //get user by id
    router.get('/:id', getUserById);
    //update
    router.put('/:id', updateUser);
    //delete
    router.delete('/:id', deleteUser);

    module.exports = router;