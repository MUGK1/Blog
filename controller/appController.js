const bcrypt = require("bcryptjs");
const User = require("../model/user");

// Open web pages routes
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

const open_register = async (request, response) => {
  const error = request.session.error;
  request.session.error = undefined;
  response.render("register", {
    title: "Registeration",
    isAuth: request.session.isAuth,
    message: error,
  });
};

// Auth endpoints
const post_login = async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    request.session.error = "Invalid Credentials";
    return response.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    request.session.error = "Invalid Credentials";
    return response.redirect("/login");
  }

  request.session.isAuth = true;
  request.session.username = user.username;

  console.log(request.session);
  response.redirect("/");
};

const post_register = async (request, response) => {
  const { name, email, password } = request.body;

  let user = await User.findOne({ email: email });

  if (user) {
    request.session.error = "User already exists";
    return response.redirect("register");
  }

  const hashPsw = await bcrypt.hash(password, 12);

  user = new User({
    name: name,
    email: email,
    password: hashPsw,
  });

  await user.save();
  request.session.error = "User registered successfully";
  response.redirect("/login");
};

const get_logout = (request, response) => {
  request.session.destroy((err) => {
    if (err) throw err;
    response.redirect("/login");
  });
};

module.exports = {
  open_index,
  open_login,
  post_login,
  open_register,
  post_register,
  get_logout,
};
