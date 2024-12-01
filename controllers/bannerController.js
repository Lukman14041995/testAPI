const pool = require('../config/db').pool;

exports.getBannerList = async (req, res) => {
    try {
        // Ambil data dari tabel banners
        const result = await pool.query('SELECT banner_name, banner_image, description FROM banners');

        // Kirim respons sukses dengan data banner
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: result.rows, // Data banner dari hasil query
        });
    } catch (err) {
        console.error('Error fetching banners:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};
