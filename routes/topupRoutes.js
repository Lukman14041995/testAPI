const express = require('express');
const { topUpBalance } = require('../controllers/topupController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route untuk melakukan top up saldo
router.post('/topup', authenticateToken, topUpBalance);

module.exports = router;
