const express = require('express');
const {
    getUserProfile,
    updateProfile,
    updateProfileImage,
} = require('../controllers/profileController'); // Pastikan fungsi diimpor dari profileController
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig'); // Import konfigurasi multer
const router = express.Router();

// Route untuk mendapatkan profil
router.get('/profile', authenticateToken, getUserProfile);

// Route untuk memperbarui profil
router.put('/profile/update', authenticateToken, updateProfile);

// Route untuk memperbarui gambar profil
router.put('/profile/image', authenticateToken, upload.single('file'), updateProfileImage);
module.exports = router;
