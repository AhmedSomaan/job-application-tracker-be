// User Schema
const mongoose = require("mongoose");
const Bookmark = require("./Bookmark");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bookmarks: [Bookmark.schema],
});

module.exports = mongoose.model("user", userSchema);
