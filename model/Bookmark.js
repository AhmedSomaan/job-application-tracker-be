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
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  companyLogo: {
    type: String,
    default: "https://placehold.co/200x200/353535/white?text=Company+Logo",
  },
  postingDate: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  salary: {
    type: String,
    default: "",
  },
  benefits: {
    type: String,
    default: "",
  },
  tags: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("bookmark", bookmarkSchema);
