const { Pool } = require('pg');
require('dotenv').config();  // Pastikan untuk memuat .env file

// Ambil string koneksi dari environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Menggunakan DATABASE_URL dari .env
    ssl: {
        rejectUnauthorized: false  // Untuk koneksi dengan SSL, seperti yang diberikan Railway
    }
});

// Fungsi untuk menguji koneksi
const testConnection = async () => {
    try {
        // Menjalankan query untuk memastikan koneksi berhasil
        const res = await pool.query('SELECT NOW()');
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        // Menangani kesalahan jika koneksi gagal
        console.error('Koneksi gagal:', err.message);
    }
};

// Mengeksport pool dan fungsi testConnection
module.exports = { pool, testConnection };

// Memanggil fungsi testConnection untuk uji koneksi saat server dijalankan
testConnection();
