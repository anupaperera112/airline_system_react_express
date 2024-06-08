const express = require("express");
const userController = require("../controllers/user.controller");
const checkAuthMiddleware = require("../middlewares/check-auth");

const router = express.Router();

router.post("/signup/:type", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/getProfile/:email", checkAuthMiddleware.checkAuth, userController.getProfile);

module.exports = router;