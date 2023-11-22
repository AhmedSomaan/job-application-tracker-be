const express = require("express");
const postingController = require("../controllers/posting-controller");
const postings = express.Router();

postings.route("/").get(postingController.getPostings);

postings.route("/:jobId").get(postingController.getDetails);

module.exports = postings;
