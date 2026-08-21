    const express = require('express');
    const router = express.Router();
    const {loginUser, getUserById, registerUser, updateUser, logoutUser} = require('../controller/user.controller.js')
    const auth = require('../middleware/auth.middleware.js');

    //create
    router.post('/register', registerUser   );
    //get all user
    router.post('/login', loginUser);
    //get user by id

    router.get('/me', auth, (req, res) => {
        res.json({message : 'protected route working fine', user: req.user})
    })

    module.exports = router;