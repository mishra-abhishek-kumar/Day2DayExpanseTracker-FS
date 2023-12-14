const router = require("express").Router();
const userRoute = require("./authRouters");
const expenseRoute = require("./expenseRouters");
const premiumRoute = require("./premiumRouters");

router.use("/user", userRoute);
router.use("/expenses", expenseRoute);
router.use("/premium", premiumRoute);

module.exports = router;
