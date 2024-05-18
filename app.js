const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

// Create an express app
const app = express();

// Adding middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Logger Middleware
app.use((request, response, next) => {
  console.log(
    `METHOD: ${request.method} -- PATH: ${request.path} -- IP: ${request.ip}`
  );
  next();
});

// Auth Middlewares
let sessionStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

sessionStore.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    saveUninitialized: true,
    resave: true,
    store: sessionStore,
  })
);

// Serve index and login pages
const appRoutes = require("./routes/appRoutes");
app.use("/", appRoutes);

// Add Post Routes handler
const postsRoutes = require("./routes/postsRoutes");
app.use("/", postsRoutes);

// Serve 404 page if no corresponding route
app.use((request, response) => {
  response
    .status(400)
    .render("404", { title: "404", isAuth: request.session.isAuth });
});

// Start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to database...");
    app.listen(process.env.PORT, "localhost", () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
