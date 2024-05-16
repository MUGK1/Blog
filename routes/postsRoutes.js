const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController");

// Open page routes
router.get("/post", postsController.open_post);
router.get("/new-post", postsController.open_new_post);
router.get("/archive", postsController.open_archive);

module.exports = router;
