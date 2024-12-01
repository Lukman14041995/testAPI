const { validationResult } = require('express-validator');
const pool = require('../config/db').pool; // Pastikan path ke db.js benar

// Fungsi untuk melakukan Top Up saldo
exports.topUpBalance = async (req, res) => {
    const { top_up_amount } = req.body;

    // Validasi input
    if (isNaN(top_up_amount) || top_up_amount <= 0) {
        return res.status(400).json({
            status: 102,
            message: 'Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
            data: null,
        });
    }
    console.log('Top Up Amount:', top_up_amount); // Log jumlah top-up yang diterima
    const user_id = req.user.id; // Ambil user_id dari JWT
    console.log('User ID:', user_id); // Log user ID untuk memastikan token valid
    try {
        const user_id = req.user.id; // Ambil user_id dari JWT

        // Cek apakah user ada
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
        if (result.rows.length === 0) {
            return res.status(401).json({
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null,
            });
        }

        // Update saldo pengguna
        const updatedUser = await pool.query(
            'UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance',
            [top_up_amount, user_id]
        );
        console.log('Updated User:', updatedUser.rows); // Log hasil update saldo
        // Pastikan saldo terupdate
        if (updatedUser.rows.length === 0) {
            return res.status(500).json({
                status: 500,
                message: 'Gagal memperbarui saldo',
                data: null,
            });
        }

        // Simpan transaksi top-up
        await pool.query(
            'INSERT INTO transactions (user_id, transaction_type, amount) VALUES ($1, $2, $3)',
            [user_id, 'TOPUP', top_up_amount]
        );

        // Kembalikan response dengan saldo terbaru
        const balance = updatedUser.rows[0].balance; // Ambil saldo terbaru
        console.log('Updated Balance:', balance); // Log saldo yang baru
        res.status(200).json({
            status: 0,
            message: 'Top Up Balance berhasil',
            data: {
                balance: balance,
            },
        });
    } catch (err) {
        console.error('Error during top up:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};

