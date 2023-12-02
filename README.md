# Overview
This is the backend for [JobCat](https://github.com/AhmedSomaan/job-application-tracker-fe) - The Job application Catalogue to keep all your job applications in one place

# Features
- Fetches Job postings from linked in using [Scrapingdog API](https://www.scrapingdog.com/linkedin-jobs-api)
- Uses MongoDB and Mongoose to store user's bookmarked jobs and all viewed job details
- update bookmark and application status (intend to apply, applied and expired)

# Requirements
- Free API key from: [Scrapingdog](https://www.scrapingdog.com/linkedin-jobs-api)
- Setup MongoDB Cluster and add connection URL

# Data Models
```js
let User = {
  name: String,
  email: String,
  phone: String,
  bookmarks: [Bookmark],
}

let Bookmark = {
  bookmarked: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["applied", "expired", "intend to apply"],
    default: "intend to apply",
  },
  jobId: String,
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  companyName: {
    type: String,
    default: "",
  },
  companyLogo: {
    type: String,
    default: "https://placehold.co/200x200/353535/white?text=Company+Logo",
  },
  postingDate: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  salary: {
    type: String,
    default: "",
  },
  benefits: {
    type: String,
    default: "",
  },
  tags: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
}

```

# Endpoints
- POST user/
- GET user/bookmarks
- GET user/saved

- POST postings/
- GET postings/:jobId
- PUT postings/:jobId
