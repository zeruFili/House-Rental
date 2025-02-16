const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const { uploadFileMiddleware } = require("./uploadMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/multerflutter')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Importing schema
require("./imageDetails");
const Images = mongoose.model("ImageDetails");

// Root route
app.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

// Route to upload multiple images
app.post("/upload-images", uploadFileMiddleware, async (req, res) => {
  // console.log("Request Filess:", req.files);
  
  const imageNames = req.files.map(file => file.filename); // Get all uploaded filenames

  try {
    await Images.insertMany(imageNames.map(imageName => ({ image: imageName })));
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

// Route to get images
app.get("/get-image", async (req, res) => {
  try {
    const data = await Images.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
});