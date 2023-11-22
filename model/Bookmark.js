// Bookmarked Job posting Schema
const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["applied", "expired", "intend to apply"],
    default: "intend to apply",
  },
  jobDetails: {
    title: String,
    description: String,
    companyName: String,
    companyLogo: String,
    postingDate: Date,
    location: String,
    salary: Number,
    benefits: String,
    jobType: String,
    link: String,
  },
});

module.exports = mongoose.model("bookmark", bookmarkSchema);
