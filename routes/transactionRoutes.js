// transactionRoutes.js
const express = require('express');
const { makeTransaction, getTransactionHistory } = require('../controllers/transactionController');
const authenticateToken = require('../middleware/authMiddleware'); // Pastikan middleware ini benar
const router = express.Router();

router.post('/transaction', authenticateToken, makeTransaction);
router.get('/transaction/history', authenticateToken, getTransactionHistory);

module.exports = router;
