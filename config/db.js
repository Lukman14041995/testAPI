const { Client } = require('pg');

// Inisialisasi koneksi ke database PostgreSQL menggunakan DATABASE_URL dari environment variable
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// Fungsi untuk menguji koneksi
const testConnection = async () => {
  try {
    await client.connect(); // Connect to PostgreSQL
    console.log("Connected to the database");
  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    await client.end(); // Menutup koneksi setelah selesai
  }
};

// Panggil testConnection ketika aplikasi dimulai
testConnection();

module.exports = { testConnection };
