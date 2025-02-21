const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.Model.js");
require('dotenv').config();


const protect = asyncHandler(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token received:", token); // Log the token for debugging
      
      const secret = process.env.SECRET_KEY; 
      const decode = jwt.verify(token, secret);
      console.log("Decoded token:", decode); // Log the decoded token

      // valid token
      req.user = await User.findById(decode.id).select("-password");
      console.log("User found:", req.user); // Log the found user

      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Error in protect middleware:", error); // Log the error
      res.status(401).json({ error: "Not authorized auth middleware" });
    }
  } else {
    res.status(401).json({ error: "Token not found" });
  }
});

module.exports = { protect };