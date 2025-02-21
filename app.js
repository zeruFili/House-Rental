const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const houseRoutes = require("./routes/HouseRoute");
const Requests = require("./routes/RequestsRoute");
const feedback = require("./routes/FeedbackRoute");
const userRoutes = require("./routes/UserRoutes");
const note = require("./routes/NotificationRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Use CORS with the origin from environment variables
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Connect to MongoDB using the connection string from environment variables
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.use("/house", houseRoutes);
app.use("/request", Requests);
app.use("/user", userRoutes);
app.use("/note", note);
app.use("/feedback", feedback);

// Use port from .env or default to 3000
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});