const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Gunakan DATABASE_URL dari .env
  ssl: {
    rejectUnauthorized: false,  // Agar SSL diterima
  },
});

const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');  // Mengecek waktu di database
    console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
  } catch (err) {
    console.error('Koneksi gagal:', err.message);
  }
};

testConnection();  // Uji koneksi ketika aplikasi dimulai

module.exports = { pool, testConnection };
