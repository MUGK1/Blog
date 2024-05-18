const bcrypt = require("bcryptjs");
const User = require("../model/user");

const open_index = async (request, response) => {
  try {
    const posts = await fetch(`http://localhost:3000/api/post`);
    const data = await posts.json();
    response.render("index", {
      title: "Home",
      isAuth: request.session.isAuth,
      posts: data,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    response.render("index", {
      title: "Home",
      isAuth: request.session.isAuth,
      posts: [],
    });
  }
};

const open_login = async (request, response) => {
  const error = request.session.error;
  request.session.error = undefined;
  response.render("login", {
    title: "Login",
    isAuth: request.session.isAuth,
    message: error,
  });
};

const post_login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    request.session.error = "Invalid Credentials 1" + " " + email;
    return response.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    request.session.error = "Invalid Credentials 2";
    return response.redirect("/login");
  }

  request.session.isAuth = true;
  request.session.username = user.username;

  console.log(request.session);
  response.redirect("/");
};

const post_logout = (request, response) => {
  request.session.destroy((err) => {
    if (err) throw err;
    response.redirect("/login");
  });
};

module.exports = {
  open_index,
  open_login,
  post_login,
  post_logout,
};
