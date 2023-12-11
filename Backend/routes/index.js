const router = require('express').Router();
const userRoute = require('./authRouters');
const expenseRoute = require('./expenseRouters');

router.use('/user', userRoute);
router.use('/user/expenses', expenseRoute);

module.exports = router;