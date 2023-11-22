// User Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  bookmarkedJobs: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Bookmark",
    },
  ],
});
