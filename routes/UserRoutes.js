const express = require("express"); // Importing express
const { 
  resetPassword, 
  register, 
  sendResetPasswordEmail, 
  checkAuth, 
  login 
} = require('../controllers/User.Controller.js'); // Importing controller functions
const  verifyToken  = require("../middlewares/VerifyToken.Middleware.js");

const router = express.Router(); // Initialize the router

// User Registration Route
router.patch('/reset/:id/:token', resetPassword);
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', verifyToken, checkAuth);

// Send Password Reset Email Route
router.post('/sendrequest', sendResetPasswordEmail);


module.exports = router; 