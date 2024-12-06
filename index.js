// Memuat variabel lingkungan dari file .env
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/db'); // Uji koneksi database

// Import routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const informationRoutes = require('./routes/informationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const ppobRoutes = require('./routes/ppobRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const app = express();

// Middleware untuk menangani request
app.use(cors()); // Mengaktifkan CORS untuk semua origin
app.use(bodyParser.json()); // Parsing body request menjadi JSON
app.use('/uploads', express.static('uploads')); // Melayani file statis di folder uploads

// Endpoints untuk memastikan API berfungsi
app.get('/', (req, res) => {
  res.send('API is running');
});

// Test koneksi ke database
testConnection();

// Menggunakan routes yang sudah didefinisikan
app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', informationRoutes);
app.use('/api', transactionRoutes);
app.use('/api', ppobRoutes);
app.use('/api', balanceRoutes);

// Menentukan port untuk aplikasi berjalan
const PORT = process.env.PORT || 8080; // Gunakan port dari environment variable atau default ke 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
