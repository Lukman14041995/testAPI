const { Pool } = require('pg');

// Gunakan variabel lingkungan DATABASE_URL yang disediakan oleh Railway
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Menggunakan DATABASE_URL dari Railway
    ssl: {
        rejectUnauthorized: false, // Pastikan koneksi aman (SSL) ke database PostgreSQL Railway
    },
});

const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()'); // Cek waktu di server database
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        console.error('Koneksi gagal:', err.message);
    }
};

module.exports = { pool, testConnection };
