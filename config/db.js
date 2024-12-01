const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testApi',
    password: 'postgres',
    port: 5432,
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
