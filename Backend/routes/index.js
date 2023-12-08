const router = require('express').Router();
const userRoute = require('./authRouters');

router.use('/user', userRoute);

module.exports = router;