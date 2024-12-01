const express = require('express');
const { getBalance } = require('../controllers/balanceController');
const authenticateToken = require('../middleware/authMiddleware');  // Pastikan token terverifikasi

const router = express.Router();

// Route untuk mendapatkan saldo user (memerlukan token)
router.get('/balance', authenticateToken, getBalance);

module.exports = router;
