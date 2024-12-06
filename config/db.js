const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ambil URL dari .env
  ssl: {
    rejectUnauthorized: false, // Disable SSL verification
  },
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
  } catch (err) {
    console.error('Koneksi gagal:', err.message);
  }
};

module.exports = { pool, testConnection };
