// handle posting mainpulations
const axios = require("axios");
const User = require("../model/User");

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

const getPostings = async (req, res) => {
  const field = req.body.field;
  const geoId = req.body.geoId || "100025096"; // Toronto Geo Id
  const page = req.body.page || "1";

  if (!field) {
    res.status(400).send("No position/job title provided");
  }

  const params = {
    api_key: apiKey,
    field: field,
    geoid: geoId,
    page: page,
  };

  try {
    const { data } = await axios.get(apiUrl, { params });

    // use pupeteer to get logo for each result

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

const getDetails = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.userId || "655e5ea7b49887078c301783";

  if (!jobId) {
    res.status(400).send("No job id provided");
  }

  // check if jobId already exists in db for that user and send it from db if it does. this is so scraper api doesnt need to be used (limited credits)
  const currentUser = await User.findById(userId);
  if (currentUser.bookmarks.find((bookmark) => bookmark.jobId === jobId)) {
    console.log("returned from db");
    const bookmarkedJob = currentUser.bookmarks.find(
      (bookmark) => bookmark.jobId === jobId
    );
    res.json(bookmarkedJob);
    return;
  }

  const params = {
    api_key: apiKey,
    job_id: jobId,
  };

  try {
    const data = {
      title: "example job title",
      description: "example description",
      company: "example company",
      location: "example location",
      date: "example days ago",
      link: "https://example.com/link",
    }; //await axios.get(apiUrl, { params });
    // save to db
    currentUser.bookmarks.push({
      jobId: jobId,
      title: data.title,
      description: data.description,
      company: data.company,
      location: data.location,
      postingDate: data.date,
      link: data.link,
    });
    await currentUser.save();
    console.log("returned from fethced api data");
    res.status(200).json(currentUser.bookmarks[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const toggleBookmark = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.userId || "655e5ea7b49887078c301783";
  const isBookmarked = req.body.isBookmarked;

  if (!jobId) {
    res.status(400).send("No job id provided");
  }
  console.log("change bookmarked to ", isBookmarked);
  const currentUser = await User.findById(userId);

  // check if jobId doesn't exists in db for that user and get the details for that job and bookmark it for that user
  if (!currentUser.bookmarks.find((bookmark) => bookmark.jobId === jobId)) {
    console.log("not in db, fetch details");

    const params = {
      api_key: apiKey,
      job_id: jobId,
    };
    try {
      const data = {
        title: "bookmarked example job title",
        description: "bookmarked example description",
        company: "bookmarked example company",
        location: "bookmarked example location",
        date: "bookmarked example days ago",
        link: "https://example.com/link",
      }; //await axios.get(apiUrl, { params });
      // save to db
      currentUser.bookmarks.push({
        jobId: jobId,
        bookmarked: isBookmarked,
        title: data.title,
        description: data.description,
        company: data.company,
        location: data.location,
        postingDate: data.date,
        link: data.link,
      });
      await currentUser.save();
      res.status(200).json(currentUser.bookmarks[0]);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
      return;
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { "bookmarks.$[job].bookmarked": isBookmarked },
      },
      { arrayFilters: [{ "job.jobId": jobId }], new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateStatus = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.userId || "655e5ea7b49887078c301783";
  const status = req.body.status;

  if (!jobId) {
    res.status(400).send("No job id provided");
  }

  try {
    console.log("change status to ", status);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { "bookmarks.$[job].status": status },
      },
      { arrayFilters: [{ "job.jobId": jobId }], new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { getPostings, getDetails, toggleBookmark, updateStatus };
