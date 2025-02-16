import express from 'express';
import { resetPassword, register , sendResetPasswordEmail , checkAuth,login } from '../controllers/auth.controller.js'; // Importing controller functions
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// User Registration Route
router.patch('/reset/:id/:token', resetPassword);
router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', verifyToken, checkAuth);

// User Login Route
router.post('/sendrequest', sendResetPasswordEmail);
router.get("/", (req, res) => {
    res.send("hello world");
});

// Additional routes for password reset can be added here...

export default router;