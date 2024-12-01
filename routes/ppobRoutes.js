const express = require('express');
const { getServicesList } = require('../controllers/ppobController');
const authenticateToken = require('../middleware/authMiddleware'); // Pastikan token terverifikasi

const router = express.Router();

// Route untuk mendapatkan list layanan PPOB (memerlukan token)
router.get('/services', authenticateToken, getServicesList);

module.exports = router;
