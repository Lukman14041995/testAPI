const pool = require('../config/db').pool;

exports.getBalance = async (req, res) => {
    try {
        // Ambil email dari payload JWT yang sudah diverifikasi oleh authenticateToken middleware
        const { email } = req.user;  // Asumsi req.user berisi informasi pengguna dari token

        // Ambil saldo berdasarkan email
        const result = await pool.query('SELECT balance FROM users WHERE email = $1', [email]);

        // Jika user tidak ditemukan
        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'User tidak ditemukan',
                data: null,
            });
        }

        // Kirim respons dengan saldo user
        res.status(200).json({
            status: 0,
            message: 'Get Balance Berhasil',
            data: {
                balance: result.rows[0].balance,
            },
        });
    } catch (err) {
        console.error('Error fetching balance:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};
