const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

// Create an express app
const app = express();

// Adding middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Serve index and login pages
app.get("/", (request, response) => {
  response.render("index", { title: "Home" });
});

app.get("/login", (request, response) => {
  response.render("login", { title: "Login" });
});

// Add Post Routes handler
const postsRoutes = require("./routes/postsRoutes");
app.use("/", postsRoutes);

// Serve 404 page if no corresponding route
app.use((request, response) => {
  response.status(400).render("404", { title: "404" });
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
