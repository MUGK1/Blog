const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const appController = require("../controller/appController");

router.get("/", authMiddleware.isAuth, appController.open_index);

router.get("/login", authMiddleware.isLogged, appController.open_login);
router.post("/api/login", appController.post_login);

router.get("/logout", appController.post_logout);

module.exports = router;