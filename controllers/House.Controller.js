const House = require("../models/House.Model");

// Create a new house
const createHouse = async (req, res) => {
  try {
    const files = req.files;

    const houseInstance = new House({
      user: req.user.id,
      location: req.body.location,
      type: req.body.type,
      category: req.body.category,
      description: req.body.description,
      availability: req.body.availability,
      photos: files.map((file) => `uploads/${file.filename}`),
      // rating: req.body.rating,
      bedrooms: req.body.bedrooms,
      nightly_price: req.body.nightly_price,
      beds: req.body.beds,
      privateBath: req.body.privateBath,
    });

    // Save the house instance to the database
    const savedHouse = await houseInstance.save();

    // Return a response
    return res.status(200).json({
      message: "House details received, logged, and saved!",
      house: savedHouse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internalll server error" });
  }
};

// Get all houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find({ availability: "available" });
    res.json({ houses });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single house by ID
const getHouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }
    res.json({ house });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateHouseWithPhotos = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;

    // Find the house by ID and update its details
    const house = await House.findByIdAndUpdate(
      id,
      {
        user: req.user.id,
        location: req.body.location,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        availability: req.body.availability,
        photos: files.map((file) => `uploads/${file.filename}`),
        // rating: req.body.rating,
        bedrooms: req.body.bedrooms,
        nightly_price: req.body.nightly_price,
        beds: req.body.beds,
        privateBath: req.body.privateBath,
      },
      { new: true }
    );

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    res.json({ message: "House updated successfully", house });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Delete a house
const deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);

    // Check if the user is a tenant
    if (req.user.role === "tenant") {
      return res.status(403).json({ error: "Can't delete a house" });
    }

    // Check if the user is not the owner of the house
    if (house.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Wrong house" });
    }

    if (!house) {
      return res.status(404).json({ error: "House not found" });
    }

    await house.remove();
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search houses by location
const searchHouses = async (req, res) => {
  try {
    const { location } = req.query;
    const houses = await House.find({
      location: { $regex: location, $options: "i" },
    });
    res.json({ houses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createHouse,
  getAllHouses,
  getHouseById,
  updateHouseWithPhotos,
  deleteHouse,
  searchHouses,
};