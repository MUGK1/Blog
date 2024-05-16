const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  author: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
