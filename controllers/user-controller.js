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

const savedJobs = async (req, res) => {
  const userId = req.body.userId || "655e5ea7b49887078c301783";

  try {
    const currentUser = await User.findById(userId);

    const savedList = currentUser.bookmarks.map((bookmark) => {
      return {
        bookmarked: bookmark.bookmarked,
        jobId: bookmark.jobId,
        status: bookmark.status,
      };
    });

    res.status(200).json(savedList);
  } catch (error) {
    console.error(error);
  }
};

const bookmarkedJobs = async (req, res) => {
  const userId = req.body.userId || "655e5ea7b49887078c301783";

  try {
    const currentUser = await User.findById(userId);

    const bookmarkedList = currentUser.bookmarks.filter(
      (bookmark) => bookmark.bookmarked
    );

    res.status(200).json(bookmarkedList);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createUser, bookmarkedJobs, savedJobs };
