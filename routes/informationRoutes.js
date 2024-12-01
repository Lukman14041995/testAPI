const express = require('express');
const { getBannerList } = require('../controllers/bannerController');

const router = express.Router();

// Route untuk mendapatkan list banner
router.get('/banner', getBannerList);

module.exports = router;
