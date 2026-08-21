const { rateLimit } = require('express-rate-limit');

const authLimiter = rateLimit({ 
    windowMs: 15 * 60 * 100,
    limit: 10,
    message:{
        message :  `Too many request, Please try again later.`
    },
    standardHeaders : true,
    legacyHeaders : false
});

module.exports ={ authLimiter };