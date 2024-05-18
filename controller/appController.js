const bcrypt = require("bcryptjs");
const User = require("../model/user");

const open_index = async (req, res) => {
  try {
    const posts = await fetch(`http://localhost:3000/api/post`);
    const data = await posts.json();
    res.render("index", {
      title: "Home",
      isAuth: req.session.isAuth,
      posts: data,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.render("index", {
      title: "Home",
      isAuth: req.session.isAuth,
      posts: [],
    });
  }
};

const open_login = async (req, res) => {
  const error = req.session.error;
  req.session.error = undefined;
  res.render("login", {
    title: "Login",
    isAuth: req.session.isAuth,
    message: error,
  });
};

const post_login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.session.error = "Invalid Credentials 1" + " " + email;
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials 2";
    return res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.username = user.username;

  console.log(req.session);
  res.redirect("/");
};

const post_logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login");
  });
};

module.exports = {
  open_index,
  open_login,
  post_login,
  post_logout,
};
