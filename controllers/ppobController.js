const pool = require('../config/db').pool;

exports.getServicesList = async (req, res) => {
    try {
        // Ambil data layanan dari tabel ppob_services
        const result = await pool.query('SELECT service_code, service_name, service_icon, service_tariff FROM ppob_services');

        // Kirim respons sukses dengan data layanan
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: result.rows, // Data layanan dari hasil query
        });
    } catch (err) {
        console.error('Error fetching services:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};
