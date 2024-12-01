const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/db'); // Uji koneksi database

// Import routes
const authRoutes = require('./routes/authRoutes');;
const profileRoutes = require('./routes/profileRoutes');
const informationRoutes = require('./routes/informationRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const ppobRoutes = require('./routes/ppobRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing body JSON
app.use('/uploads', express.static('uploads')); // Melayani file statis dari folder uploads
// Test koneksi database
testConnection();

// Use routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes)
app.use('/api', informationRoutes);
app.use('/api', transactionRoutes);
app.use('/api', ppobRoutes);
app.use('/api', balanceRoutes);

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
