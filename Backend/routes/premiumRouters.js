const router = require("express").Router();
const premiumController = require("../controllers/premiumController");
const requiredUser = require("../middlewares/requiredUser");

router.get("/buy-premium", requiredUser, premiumController.purchasePremium);
router.post(
	"/update-txn-status",
	requiredUser,
	premiumController.updateTxnStatus
);
router.get(
	"/show-leaderboard",
	requiredUser,
	premiumController.showLeaderboard
);
router.get("/daily-expense-report", requiredUser, premiumController.dailyExpenseReport);
router.get("/monthly-expense-report", requiredUser, premiumController.monthlyExpenseReport);
router.get("/yearly-expense-report", requiredUser, premiumController.yearlyExpenseReport);

module.exports = router;
