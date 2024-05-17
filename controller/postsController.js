const { validationResult } = require("express-validator");

// Open web pages routes
const open_post = (request, response) => {
  response.render("post", { title: "Post" });
};

const open_new_post = (request, response) => {
  response.render("post-editor", { title: "Add new post", message: "" });
};

const open_archive = (request, response) => {
  response.render("archive", { title: "Archive" });
};

// write functions
const Post = require("../model/post");

const add_post = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render("post_editor", {
      title: "Add new post",
      errors: errors.array(),
      message: "",
    });
  }

  let post = new Post(request.body);
  post
    .save()
    .then((data) => {
      console.log(`Post saved to database: id -> ${data._id}`);
      return response.render("post_editor", {
        title: "Add new post",
        errors: [],
        message: "Post successfully published",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const update_post = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render("post_editor", {
      title: "Update Post",
      errors: errors.array(),
      message: "",
    });
  }

  let post = new Post(request.body);
  post
    .save()
    .then((data) => {
      console.log(`Post saved to database: id -> ${data._id}`);
      return response.render("post_editor", {
        title: "Update Post",
        errors: [],
        message: "Post successfully published",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports
module.exports = {
  open_post,
  open_new_post,
  open_archive,
  add_post,
  update_post,
};
