const { Pool } = require('pg');
require('dotenv').config(); // Memuat variabel dari file .env

// Membuat pool koneksi dengan DATABASE_URL yang ada di file .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Menghindari masalah dengan sertifikat SSL yang tidak terverifikasi
    },
});

// Fungsi untuk menguji koneksi
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); // Mengeksekusi query
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        console.error('Koneksi gagal:', err.message);
    }
};

// Mengekspor pool dan fungsi testConnection
module.exports = { pool, testConnection };
