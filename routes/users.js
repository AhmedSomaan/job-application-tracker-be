const express = require("express");
const userController = require("../controllers/user-controller");
const users = express.Router();

users.route("/").post(userController.createUser);

// users
//   .route("/:id")
//   .get(inventoryController.findById)
//   .put(inventoryController.updateInventory)
//   .delete(inventoryController.deleteInventoryItem);

module.exports = users;
