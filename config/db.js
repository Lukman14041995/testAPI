const { Pool } = require('pg');

// Gunakan DATABASE_URL yang disediakan oleh Railway
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Menggunakan URL koneksi yang diberikan oleh Railway
    ssl: {
        rejectUnauthorized: false,  // SSL harus diaktifkan untuk koneksi ke database di Railway
    },
});

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); // Memeriksa waktu di server database
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        console.error('Koneksi gagal:', err.message);
    }
};

module.exports = { pool, testConnection };
