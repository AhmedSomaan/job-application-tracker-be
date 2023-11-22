// handle posting mainpulations
const axios = require("axios");

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
  const jobId = req.body.jobId;

  if (!jobId) {
    res.status(400).send("No job id provided");
  }

  // check if jobId already exists in db for that user and send it from db if it does. this is so scraper api doesnt need to be used (limitied credits)

  const params = {
    api_key: apiKey,
    job_id: jobId,
  };

  try {
    const { data } = await axios.get(apiUrl, { params });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }

  // save to db
};

module.exports = { getPostings, getDetails };
