// routes/protectedRoutes.js
const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Contoh endpoint yang dilindungi
router.get('/api/protected', verifyToken, (req, res) => {
    res.json({
        status: 0,
        message: 'Akses diterima!',
        data: req.user, // Data dari token yang sudah diverifikasi
    });
});

module.exports = router;
