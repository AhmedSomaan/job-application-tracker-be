require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

// connect to MongoDB
connectDB();

// Retireve the variables in the .env file
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;

// Initialize the server
const app = express();

// Adding middleware to the server
app.use(cors({ origin: "http://localhost:" + FRONTEND_PORT }));
app.use(express.json());

// Let the server listen to the port if database is connected
mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(BACKEND_PORT, () => {
    console.log(`Listening to port ${BACKEND_PORT}`);
  });
});
