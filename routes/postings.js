const express = require("express");
const postingController = require("../controllers/posting-controller");
const postings = express.Router();

postings.route("/").get(postingController.getPostings);

postings
  .route("/:jobId")
  .get(postingController.getDetails)
  .put((req, res) => {
    if (req.body.status) {
      postingController.updateStatus(req, res);
    } else {
      postingController.toggleBookmark(req, res);
    }
  });

module.exports = postings;
