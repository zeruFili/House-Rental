const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables from .env file

const houseRoutes = require("./routes/HouseRoute");
const Requests = require("./routes/RequestsRoute");
const feedback = require("./routes/FeedbackRoute");
const userRoutes = require("./routes/userRoutes");
const note = require("./routes/NotificationRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:52966", credentials: true }));

mongoose
  .connect("mongodb://0.0.0.0:27017/Haylegnaw")
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
app.use("/feed", feedback);

// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
