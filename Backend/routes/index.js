const router = require('express').Router();
const userRoute = require('./authRouters');
const expenseRoute = require('./expenseRouters');
const purchaseRoute = require('./purchaseRouters');

router.use('/user', userRoute);
router.use('/expenses', expenseRoute);
router.use('/purchase', purchaseRoute);

module.exports = router;