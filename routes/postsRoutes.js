const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");
const authMiddleware = require("../middleware/auth");
const { check } = require("express-validator");

// Open page routes
router.get("/post", authMiddleware.isAuth, postsController.open_post);
router.get(
  "/post-editor",
  authMiddleware.isAuth,
  postsController.open_new_post
);
router.get("/archive", authMiddleware.isAuth, postsController.open_archive);

// Read routes
router.get("/api/post", postsController.get_post);

// write routes
router.post(
  "/api/post",
  [
    check("title").notEmpty().isLength({ min: 5, max: 100 }),
    check("subtitle").notEmpty().isLength({ min: 5, max: 100 }),
    check("author").notEmpty().isLength({ min: 5, max: 50 }),
    check("publishedAt").notEmpty().isDate(),
    check("content").notEmpty().isLength({ min: 100, max: 2000 }),
  ],
  postsController.add_post
);

router.put(
  "/api/post",
  [
    check("title").notEmpty().isLength({ min: 5, max: 100 }),
    check("subtitle").notEmpty().isLength({ min: 5, max: 100 }),
    check("author").notEmpty().isLength({ min: 5, max: 50 }),
    check("publishedAt").notEmpty().isDate(),
    check("content").notEmpty().isLength({ min: 100, max: 2000 }),
  ],
  postsController.update_post
);

router.get("/api/getSearchTable", postsController.find_posts);

router.delete("/api/post/:id", postsController.delete_post);

module.exports = router;
