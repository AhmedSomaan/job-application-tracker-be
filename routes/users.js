const express = require("express");
const userController = require("../controllers/user-controller");
const users = express.Router();

users.route("/").post(userController.createUser);

users.route("/bookmarks").get(userController.bookmarkedJobs);

users.route("/saved").get(userController.savedJobs);

module.exports = users;
