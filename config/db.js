require('dotenv').config();  // Menambahkan baris ini untuk memuat file .env

const { Pool } = require('pg');

// Menggunakan DATABASE_URL dari environment variables
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // Mengambil nilai dari DATABASE_URL
    ssl: {
        rejectUnauthorized: false,  // Agar koneksi SSL tetap diterima
    },
});

// Fungsi untuk menguji koneksi
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');  // Mengeksekusi query
        console.log('Koneksi berhasil! Waktu di server database:', res.rows[0].now);
    } catch (err) {
        console.error('Koneksi gagal:', err.message);
    }
};

testConnection();  // Memanggil fungsi untuk menguji koneksi
