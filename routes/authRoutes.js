const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Route untuk registrasi
router.post('/registration', registerUser);

// Route untuk login
router.post('/login', loginUser);

module.exports = router;
