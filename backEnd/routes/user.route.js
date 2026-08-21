    const express = require('express');
    const router = express.Router();
    const {loginUser, registerUser} = require('../controller/user.controller.js')
    const auth = require('../middleware/auth.middleware.js');
    const {authLimiter} = require('../middleware/limites.middleware.js');

    //create
    router.post('/register',authLimiter, registerUser   );
    //get all user
    router.post('/login',authLimiter, loginUser);
    //get user by id

    router.get('/me', auth, (req, res) => {
        res.json({message : 'protected route working fine', user: req.user})
    })

    module.exports = router;