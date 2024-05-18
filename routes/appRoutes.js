const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const appController = require("../controller/appController");
const { check } = require("express-validator");

router.get("/", appController.open_index);
router.get("/login", authMiddleware.isLogged, appController.open_login);
router.post("/api/login", appController.post_login);
router.get("/register", authMiddleware.isLogged, appController.open_register);
router.post(
  "/api/register",
  [
    check("name").notEmpty().isLength({ min: 5, max: 50 }),
    check("email").notEmpty().isLength({ min: 5, max: 150 }).isEmail(),
    check("password").notEmpty().isLength({ min: 5, max: 50 }),
  ],
  appController.post_register,
);
router.get("/logout", appController.get_logout);

module.exports = router;
