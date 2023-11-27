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
    // const { data } = await axios.get(apiUrl, { params });
    const data = [
      {
        job_position: "Fullstack Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/fullstack-developer-at-nucleo-digital-3746740316?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=DDbqpriBOVNiunloJT%2BOPg%3D%3D&position=1&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3746740316",
        company_name: "Nucleo Digital",
        company_profile:
          "https://ca.linkedin.com/company/nucleodigital?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-09-28",
      },
      {
        job_position: "Software Developer-Java",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-java-at-zortech-solutions-3630467704?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=1TCYYo4KfquKvDN7fVFFjQ%3D%3D&position=2&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3630467704",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-06-09",
      },
      {
        job_position:
          "Entry Level Software Engineer - Data Backend Engineer (Remote - Canada)",
        job_link:
          "https://ca.linkedin.com/jobs/view/entry-level-software-engineer-data-backend-engineer-remote-canada-at-yelp-3761343748?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=hqvmZb5zx8037myTkhv9sw%3D%3D&position=3&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3761343748",
        company_name: "Yelp",
        company_profile:
          "https://www.linkedin.com/company/yelp-com?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-08",
      },
      {
        job_position: "Java Developer-TRW",
        job_link:
          "https://ca.linkedin.com/jobs/view/java-developer-trw-at-zortech-solutions-3750872113?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=FKV3U%2Bu%2BcHGeL2BytNFRpw%3D%3D&position=4&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3750872113",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-10-31",
      },
      {
        job_position: "Software Developer – JavaScript & Python",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-%E2%80%93-javascript-python-at-messagepoint-3667136416?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=JqFXxMb86SjTWlhdudikvw%3D%3D&position=5&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3667136416",
        company_name: "Messagepoint",
        company_profile:
          "https://ca.linkedin.com/company/messagepoint?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-07-17",
      },
      {
        job_position: "Software Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-at-pwc-canada-3766440150?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=vaYNBedzi%2F%2F0A1M3m8xfUw%3D%3D&position=6&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3766440150",
        company_name: "PwC Canada",
        company_profile:
          "https://ca.linkedin.com/company/pwc-canada?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-16",
      },
      {
        job_position: "Software Development Engineer I",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-development-engineer-i-at-yardi-systems-3735958535?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=GkVbcTFyve5r4kk9R1wKvg%3D%3D&position=7&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3735958535",
        company_name: "Yardi Systems",
        company_profile:
          "https://www.linkedin.com/company/yardi-systems?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-10-09",
      },
      {
        job_position: "Software Engineer (Canada)",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-canada-at-us-mobile-3575823073?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=SHrLyMY6LJQDKZBcNUJQtA%3D%3D&position=8&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3575823073",
        company_name: "US Mobile",
        company_profile:
          "https://www.linkedin.com/company/usmobile?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-03-29",
      },
      {
        job_position: "React Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/react-developer-at-extreme-reach-3720087715?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=lhDt1F4DScejx2xhNIiQMw%3D%3D&position=9&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3720087715",
        company_name: "Extreme Reach",
        company_profile:
          "https://www.linkedin.com/company/extreme-reach?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-09-13",
      },
      {
        job_position: "Front-End Developer (Adobe Franklin)",
        job_link:
          "https://ca.linkedin.com/jobs/view/front-end-developer-adobe-franklin-at-thinkingbox-3729793723?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=gr63zfAkPIXVX5AzyKEMjA%3D%3D&position=10&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3729793723",
        company_name: "Thinkingbox",
        company_profile:
          "https://ca.linkedin.com/company/thinkingbox?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-09-12",
      },
      {
        job_position: "Software Engineer, Front-End (Retain and Expand)",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-front-end-retain-and-expand-at-grammarly-3724652688?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=SMzLRUX0weIt7q%2B9MXIWmA%3D%3D&position=11&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3724652688",
        company_name: "Grammarly",
        company_profile:
          "https://www.linkedin.com/company/grammarly?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-02",
      },
      {
        job_position: "Software Developer - Core Engineering",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-core-engineering-at-robinhood-3704070906?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=EVNmdelB53XHBgi68EVAVA%3D%3D&position=12&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3704070906",
        company_name: "Robinhood",
        company_profile:
          "https://www.linkedin.com/company/robinhood?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-08-29",
      },
      {
        job_position: "Java Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/java-developer-at-zortech-solutions-3743473686?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=iMGIjrjPdA3YY2rWPfuXrQ%3D%3D&position=13&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3743473686",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-10-20",
      },
      {
        job_position: "Software Developer Co-op (8-month)",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-co-op-8-month-at-intuit-3735827892?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=jLYaDzzHL%2B%2F7XTgsQNRZWQ%3D%3D&position=14&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3735827892",
        company_name: "Intuit",
        company_profile:
          "https://www.linkedin.com/company/intuit?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-02",
      },
      {
        job_position: "Software Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-at-scotiabank-3701785078?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=8OoaQ1XMWJCmoq6IBFkUaA%3D%3D&position=15&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3701785078",
        company_name: "Scotiabank",
        company_profile:
          "https://ca.linkedin.com/company/scotiabank?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-08-31",
      },
      {
        job_position: "UI Web Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/ui-web-developer-at-zortech-solutions-3667480050?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=HwITqnUgL%2F3dkowFD45a8Q%3D%3D&position=16&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3667480050",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-06-25",
      },
      {
        job_position: "Software Engineer",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-at-cisco-3768693951?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=LSmpw95wBw%2ByzjixQXP%2FcA%3D%3D&position=17&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3768693951",
        company_name: "Cisco",
        company_profile:
          "https://www.linkedin.com/company/cisco?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-17",
      },
      {
        job_position: "Software Engineer - Node",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-node-at-morgan-mckinley-3764614604?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=9ppAbdpGkRkCsGbBpfojNQ%3D%3D&position=18&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3764614604",
        company_name: "Morgan McKinley",
        company_profile:
          "https://ie.linkedin.com/company/morgan-mckinley?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-13",
      },
      {
        job_position: "Software Engineer",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-at-boosted-ai-3736367393?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=rm6ZIMNepNH9IFyqVyxG%2FQ%3D%3D&position=19&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3736367393",
        company_name: "Boosted.ai",
        company_profile:
          "https://ca.linkedin.com/company/boostedai?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-10-12",
      },
      {
        job_position: "Full Stack Engineer - Toronto",
        job_link:
          "https://ca.linkedin.com/jobs/view/full-stack-engineer-toronto-at-talentlab-3643863163?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=Mp%2F4CG0%2Fzz3%2FxFVZG39uYg%3D%3D&position=20&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3643863163",
        company_name: "TalentLab",
        company_profile:
          "https://ca.linkedin.com/company/talentlab?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-06-03",
      },
      {
        job_position: "Software Engineer - Python",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-engineer-python-at-morgan-mckinley-3764618190?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=Ja8GhF6%2FPrxWxPdSSoZrVA%3D%3D&position=21&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3764618190",
        company_name: "Morgan McKinley",
        company_profile:
          "https://ie.linkedin.com/company/morgan-mckinley?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-11-13",
      },
      {
        job_position: "Full Stack Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/full-stack-developer-at-dawn-staffing-solutions-inc-3733831834?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=Fuifq5%2BHjwSYwNewPwO4EA%3D%3D&position=22&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3733831834",
        company_name: "Dawn Staffing Solutions Inc",
        company_profile:
          "https://ca.linkedin.com/company/dawn-staffing-solutions?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-09-11",
      },
      {
        job_position: "Software Developer (FT)",
        job_link:
          "https://ca.linkedin.com/jobs/view/software-developer-ft-at-malvi-systems-3761834730?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=Xvf717QcuwUqPFAPz9%2F8cg%3D%3D&position=23&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3761834730",
        company_name: "Malvi Systems",
        company_profile:
          "https://in.linkedin.com/company/malvi-system?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Etobicoke, Ontario, Canada",
        job_posting_date: "2023-11-16",
      },
      {
        job_position: "React Developer",
        job_link:
          "https://ca.linkedin.com/jobs/view/react-developer-at-zortech-solutions-3667472981?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=NVhWzvbjxaj5dMyQE%2BmzvA%3D%3D&position=24&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3667472981",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-06-25",
      },
      {
        job_position: "Java Developer-TRW-Canada",
        job_link:
          "https://ca.linkedin.com/jobs/view/java-developer-trw-canada-at-zortech-solutions-3750880301?refId=xSF5eQ7b91foEj9pjRE87w%3D%3D&trackingId=NliUOoiKbi6440v2sEvzBQ%3D%3D&position=25&pageNum=1&trk=public_jobs_jserp-result_search-card",
        job_id: "3750880301",
        company_name: "Zortech Solutions",
        company_profile:
          "https://ca.linkedin.com/company/zortech?trk=public_jobs_jserp-result_job-search-card-subtitle",
        job_location: "Toronto, Ontario, Canada",
        job_posting_date: "2023-10-31",
      },
    ];
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
    const data = {
      job_position: "example job title",
      job_description: "example description",
      company_name: "example company",
      job_location: "example location",
      job_posting_time: "example days ago",
      Employment_type: "Full-time",
      Seniority_level: "Entry level",
      job_apply_link: "https://example.com/link",
    }; //await axios.get(apiUrl, { params });
    // save to db
    currentUser.bookmarks.push({
      jobId: jobId,
      title: data.job_position,
      description: data.job_description,
      companyName: data.company_name,
      location: data.job_location,
      postingDate: data.job_posting_time,
      tags: `${data.Employment_type}|${data.Seniority_level}`,
      link: data.job_apply_link,
    });
    await currentUser.save();
    console.log("returned from fethced api data");
    res.status(200).json(currentUser.bookmarks);
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
        job_position: "saved example job title",
        job_description: "saved example description",
        company_name: "saved example company",
        job_location: "saved example location",
        job_posting_time: "saved example days ago",
        Employment_type: "saved Full-time",
        Seniority_level: "saved Entry level",
        job_apply_link: "https://example.com/link",
      }; //await axios.get(apiUrl, { params });
      // save to db
      const updatedBookmark = {
        jobId: jobId,
        bookmarked: isBookmarked,
        title: data.job_position,
        description: data.job_description,
        companyName: data.company_name,
        location: data.job_location,
        postingDate: data.job_posting_time,
        tags: `${data.Employment_type}|${data.Seniority_level}`,
        link: data.job_apply_link,
      };
      currentUser.bookmarks.push(updatedBookmark);
      await currentUser.save();
      res.status(200).json(updatedBookmark);
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
