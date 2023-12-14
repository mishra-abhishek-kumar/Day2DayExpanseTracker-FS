const router = require('express').Router();
const premiumController = require('../controllers/premiumController');
const requiredUser = require("../middlewares/requiredUser");

router.get('/buy-premium', requiredUser, premiumController.purchasePremium);
router.post('/update-txn-status', requiredUser, premiumController.updateTxnStatus);
router.get('/show-leaderboard', premiumController.showLeaderboard);

module.exports = router;