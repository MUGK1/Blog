const { validationResult } = require("express-validator");

// Open web pages routes
const open_post = (request, response) => {
  response.render("post", { title: "Post" });
};

const open_new_post = (request, response) => {
  response.render("new-post", { title: "Add new post" });
};

const open_archive = (request, response) => {
  response.render("archive", { title: "Archive" });
};

// write functions
const Post = require("../model/post");

const add_post = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render("new-post", {
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
      response.render("new-post", {
        title: "Add new post",
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
};
