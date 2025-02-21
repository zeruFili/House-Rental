const express = require("express");
const router = express.Router();
const { submitFeedback, getHouseFeedback } = require("../controllers/Feedback.Controller");
const { protect } = require("../middlewares/Auth.Middleware");

// Route to submit feedback
router.post("/", protect, submitFeedback);

// Route to get feedback for a house
router.get("/house/:houseId/", getHouseFeedback);

module.exports = router;
