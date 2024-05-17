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

const get_post = (request, response) => {
  Post.find({})
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

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

const delete_post = (request, response) => {
  let id = request.params.id;

  Post.findByIdAndDelete(id)
    .then((result) => {
      console.log(`Post deleted from database: id -> ${result._id}`);
      response.redirect("/archive");
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
  get_post,
  delete_post,
};
