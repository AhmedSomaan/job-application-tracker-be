const mongoose = require("mongoose");
const User = require("../model/User");

const createUser = async (req, res) => {
  const name = req.body.name || "Example User";
  const email = req.body.email || "example@email.com";
  const phone = req.body.phone || "123-456-7890";

  try {
    const createdUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      bookmarks: [],
    });

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser };
