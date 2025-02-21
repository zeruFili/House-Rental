const express = require("express");
const router = express.Router();
const houseController = require("../controllers/House.Controller");
const houseValidationMiddleware = require("../middlewares/House.Middleware");
const { protect } = require("../middlewares/Auth.Middleware");
const { uploadFileMiddleware } = require("../middlewares/Multer.Middleware");
// Create a new house
router.post(
  "/createhouses",
  protect,
  uploadFileMiddleware,
  houseValidationMiddleware,
  houseController.createHouse
);

// Get all houses
router.get("/houses", houseController.getAllHouses);

// Get a single house by ID
router.get("/houses/:id", houseController.getHouseById);

router.patch(
  "/with/:id",
  protect,
  uploadFileMiddleware,

  houseController.updateHouseWithPhotos
);

// Delete a house
router.delete("/houses/:id", protect, houseController.deleteHouse);

// Search houses by location
router.get("/housess", houseController.searchHouses);

module.exports = router;
