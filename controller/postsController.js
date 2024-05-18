const { validationResult } = require("express-validator");

// Open web pages routes
const open_post = (request, response) => {
  response.render("post", { title: "Post", isAuth: request.session.isAuth });
};

const open_new_post = (request, response) => {
  response.render("post-editor", {
    title: "Add new post",
    isAuth: request.session.isAuth,
    message: "",
  });
};

const open_archive = async (request, response) => {
  try {
    const posts = await fetch(`http://localhost:3000/api/post`);
    const data = await posts.json();
    response.render("archive", {
      title: "Archive",
      isAuth: request.session.isAuth,
      posts: data,
    });
  } catch {
    console.error("error fetching posts");
    response.render("Archive", { title: "Archive", posts: [] });
  }
};

// write functions
const Post = require("../model/post");

const add_post = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.render("post-editor", {
      title: "Add new post",
      isAuth: request.session.isAuth,
      errors: errors.array(),
      message: "",
    });
  }

  let post = new Post(request.body);
  post
    .save()
    .then((data) => {
      console.log(`Post saved to database: id -> ${data._id}`);
      return response.render("post-editor", {
        title: "Add new post",
        isAuth: request.session.isAuth,
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

// read functions
const get_post = (request, response) => {
  Post.find({})
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const get_post_by_id = (request, response) => {
  Post.findById(params.body.id)
    .then((data) => {
      response.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const find_posts = (request, response) => {
  let input = request.query.searchInput;
  let searchInputRegex = input.length > 0 ? new RegExp(input, "i") : null;
  let search = {};
  if (searchInputRegex != null) {
    search = {
      $or: [
        { title: { $regex: searchInputRegex } },
        { author: { $regex: searchInputRegex } },
      ],
    };
  } else {
    response.status(204).end();
  }
  Post.find(search)
    .then((data) => {
      response.render("archive", { title: "Search Posts", posts: data });
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
  get_post,
  delete_post,
  get_post_by_id,
  find_posts,
};
