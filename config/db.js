const { Pool } = require('pg');
require('dotenv').config();

// Cek apakah variabel DATABASE_URL berhasil dimuat
console.log("Database URL:", process.env.DATABASE_URL);

// Pengaturan koneksi ke PostgreSQL menggunakan SSL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,  // Agar bisa terhubung meski sertifikat tidak diverifikasi
    },
});

// Fungsi untuk menguji koneksi
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        console.error('Koneksi gagal:', err.message);
    }
};

// Test koneksi database
testConnection();
