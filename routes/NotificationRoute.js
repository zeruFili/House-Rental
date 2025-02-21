const express = require("express");
const {
  createNotification,
  getNotificationsByUserId,
} = require("../controllers/Notification.Controller");
const { protect } = require("../middlewares/Auth.Middleware");

const router = express.Router();

// POST /notifications
router.post("/", protect, createNotification);
router.get("/:userId", getNotificationsByUserId);

module.exports = router;
