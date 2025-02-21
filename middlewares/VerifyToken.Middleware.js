const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require('../models/User.Model.js');

const verifyToken = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }

    try {
        const secret = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id; // Store user ID for subsequent use
        req.user = await UserModel.findById(req.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ error: "Not authorized" });
    }
});

module.exports = verifyToken; // Export the function