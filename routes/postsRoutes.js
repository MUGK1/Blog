const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");
const { check } = require("express-validator");

// Open page routes
router.get("/post", postsController.open_post);
router.get("/new-post", postsController.open_new_post);
router.get("/archive", postsController.open_archive);

// write routes
router.post(
  "/new-post",
  [
    check("title").notEmpty().isLength({ min: 5, max: 100 }),
    check("subtitle").notEmpty().isLength({ min: 5, max: 100 }),
    check("author").notEmpty().isLength({ min: 5, max: 50 }),
    check("publishedAt").notEmpty().isDate(),
    check("content").notEmpty().isLength({ min: 100, max: 2000 }),
  ],
  postsController.add_post
);

module.exports = router;
