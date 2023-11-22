// Bookmarked Job posting Schema
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  bookmarked: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["applied", "expired", "intend to apply"],
    default: "intend to apply",
  },
  jobId: String,
  title: String,
  description: String,
  companyName: String,
  companyLogo: String,
  postingDate: String,
  location: String,
  salary: Number,
  benefits: String,
  jobType: String,
  link: String,
});

module.exports = mongoose.model("bookmark", bookmarkSchema);
