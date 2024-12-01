const { validationResult } = require('express-validator');
const pool = require('../config/db').pool; // Pastikan path ke db.js benar

exports.makeTransaction = async (req, res) => {
    // Validasi input request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 102,
            message: 'Parameter tidak valid',
            data: errors.array(),
        });
    }

    const { service_code } = req.body;
    const user_id = req.user.id; // Ambil user_id dari JWT token

    // Cek apakah service_code valid
    const services = [
        { code: "PULSA", name: "Pulsa", tariff: 10000 },
        { code: "PLN", name: "Listrik", tariff: 20000 },
        { code: "PDAM", name: "PDAM", tariff: 30000 },
        // Tambahkan layanan lainnya di sini
    ];

    const service = services.find(s => s.code === service_code);
    
    if (!service) {
        return res.status(400).json({
            status: 102,
            message: 'Service atau Layanan tidak ditemukan',
            data: null,
        });
    }

    // Cek saldo pengguna
    const userResult = await pool.query('SELECT balance FROM users WHERE id = $1', [user_id]);

    if (userResult.rows.length === 0) {
        return res.status(401).json({
            status: 108,
            message: 'Token tidak valid atau kadaluwarsa',
            data: null,
        });
    }

    const user = userResult.rows[0];
    const totalAmount = service.tariff;

    // Cek jika saldo mencukupi
    if (user.balance < totalAmount) {
        return res.status(400).json({
            status: 103,
            message: 'Saldo tidak mencukupi',
            data: null,
        });
    }

    // Menggunakan transaksi database untuk memastikan integritas data
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); // Mulai transaksi

        // Kurangi saldo pengguna
        const updatedUser = await client.query(
            'UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance',
            [totalAmount, user_id]
        );

        if (updatedUser.rows.length === 0) {
            throw new Error('Gagal memperbarui saldo');
        }

        // Generate nomor invoice
        const invoiceNumber = `INV${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Simpan transaksi
        await client.query(
            'INSERT INTO transactions (user_id, service_code, service_name, transaction_type, amount, invoice_number, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [user_id, service_code, service.name, 'PAYMENT', totalAmount, invoiceNumber, new Date()]
        );
        
        
        

        await client.query('COMMIT'); // Commit transaksi

        // Response transaksi berhasil
        res.status(200).json({
            status: 0,
            message: 'Transaksi berhasil',
            data: {
                invoice_number: invoiceNumber,
                service_code: service_code,
                service_name: service.name,
                transaction_type: 'PAYMENT',
                total_amount: totalAmount,
                created_on: new Date().toISOString(),
            },
        });

    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaksi jika terjadi error
        console.error('Error during transaction:', error);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    } finally {
        client.release(); // Kembali ke pool koneksi
    }
};

exports.getTransactionHistory = async (req, res) => {
    const user_id = req.user.id; // Ambil user_id dari JWT token
    const { offset = 0, limit = 10 } = req.query; // Default offset 0 dan limit 10

    // Validasi parameter offset dan limit
    if (isNaN(offset) || isNaN(limit)) {
        return res.status(400).json({
            status: 102,
            message: 'Parameter offset atau limit tidak valid',
            data: null,
        });
    }

    try {
        // Query untuk mendapatkan history transaksi
        const historyResult = await pool.query(
            `SELECT invoice_number, transaction_type, description, created_on
            FROM transactions 
            WHERE user_id = $1
            ORDER BY created_on DESC
            LIMIT $2 OFFSET $3`,
            [user_id, limit, offset]
        );        

        const records = historyResult.rows;

        // Response transaksi history
        res.status(200).json({
            status: 0,
            message: 'Get History Berhasil',
            data: {
                offset: parseInt(offset),
                limit: parseInt(limit),
                records: records,
            },
        });
    } catch (error) {
        console.error('Error getting transaction history:', error);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};
