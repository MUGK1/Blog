const mongoose = require("mongoose");

let postSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Post", postSchema);
