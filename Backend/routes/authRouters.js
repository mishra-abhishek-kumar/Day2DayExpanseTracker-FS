const router = require("express").Router();
const authController = require("../controllers/authController");
const requiredUser = require("../middlewares/requiredUser");

router.post("/signup", authController.signUpController);
router.post("/login", authController.loginController);
router.get("/ispremium", requiredUser, authController.isPremium);
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;