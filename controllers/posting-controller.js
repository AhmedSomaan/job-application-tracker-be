// handle posting mainpulations
const axios = require("axios");
const User = require("../model/User");

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

const getPostings = async (req, res) => {
  const field = req.body.field || "software developer";
  const geoId = req.body.geoId || "100025096"; // Toronto Geo Id
  const page = req.body.page || "1";

  console.log(req.body);

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
    const formattedData = data.map((post) => {
      return {
        title: post.job_position,
        link: post.job_link,
        jobId: post.job_id,
        companyName: post.company_name,
        location: post.job_location,
        postingDate: post.job_posting_date,
        companyLogo:
          "https://placehold.co/200x200/353535/white?text=Company+Logo",
      };
    });
    res.status(200).json(formattedData);
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
    const { data } = await axios.get(apiUrl, { params });
    // save to db
    const newBookmark = {
      jobId: jobId,
      title: data[0].job_position,
      description: data[0].job_description,
      companyName: data[0].company_name,
      location: data[0].job_location,
      postingDate: data[0].job_posting_time,
      tags: `${data[0].Employment_type}|${data[0].Seniority_level}`,
      link: data[0].job_apply_link,
    };
    currentUser.bookmarks.push(newBookmark);
    await currentUser.save();
    console.log("returned from fethced api data ", data);
    res
      .status(200)
      .json(currentUser.bookmarks.find((bookmark) => bookmark.jobId === jobId));
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
      const { data } = await axios.get(apiUrl, { params });
      console.log("toggle bookmark: ", data);
      // save to db
      const updatedBookmark = {
        jobId: jobId,
        bookmarked: isBookmarked,
        title: data[0].job_position,
        description: data[0].job_description,
        companyName: data[0].company_name,
        location: data[0].job_location,
        postingDate: data[0].job_posting_time,
        tags: `${data[0].Employment_type}|${data[0].Seniority_level}`,
        link: data[0].job_apply_link,
      };
      currentUser.bookmarks.push(updatedBookmark);
      await currentUser.save();
      res
        .status(200)
        .json(
          currentUser.bookmarks.find((bookmark) => bookmark.jobId === jobId)
        );
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

    const updatedBookmark = updatedUser.bookmarks.find(
      (bookmark) => bookmark.jobId === jobId
    );
    res.status(200).json(updatedBookmark);
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

    res
      .status(200)
      .json(updatedUser.bookmarks.find((bookmark) => bookmark.jobId === jobId));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { getPostings, getDetails, toggleBookmark, updateStatus };
