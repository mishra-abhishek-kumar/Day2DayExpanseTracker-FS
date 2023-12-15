const router = require("express").Router();
const passwordController = require("../controllers/passwordController");

router.post("/user-exist", passwordController.userExist);
router.post("/forgot-password", passwordController.forgotPassword);

module.exports = router;