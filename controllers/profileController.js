const pool = require('../config/db').pool;

// Mendapatkan profil pengguna
exports.getUserProfile = async (req, res) => {
    try {
        const email = req.user.email; // Ambil email dari token JWT
        const result = await pool.query(
            'SELECT email, first_name, last_name, profile_image FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Profil tidak ditemukan',
                data: null,
            });
        }

        const user = result.rows[0];
        res.status(200).json({
            status: 0,
            message: 'Sukses',
            data: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: user.profile_image || 'https://yoururlapi.com/profile.jpeg',
            },
        });
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};

// Memperbarui profil pengguna
exports.updateProfile = async (req, res) => {
    try {
        const email = req.user.email; // Ambil email dari payload JWT
        const { first_name, last_name } = req.body; // Ambil data dari body request

        // Perbarui data di database
        const result = await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2 WHERE email = $3 RETURNING *',
            [first_name, last_name, email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Profil tidak ditemukan',
                data: null,
            });
        }

        const updatedUser = result.rows[0];

        // Kirim respons sukses
        res.status(200).json({
            status: 0,
            message: 'Update Profile berhasil',
            data: {
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                profile_image: updatedUser.profile_image || 'https://yoururlapi.com/profile.jpeg',
            },
        });
    } catch (err) {
        console.error('Error during profile update:', err.message);
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};

// Memperbarui gambar profil pengguna
exports.updateProfileImage = async (req, res) => {
    try {
        const email = req.user.email; // Ambil email dari payload JWT
        console.log('User email from token:', email);

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({
                status: 102,
                message: 'Tidak ada file yang diupload',
                data: null,
            });
        }

        const filePath = req.file.path; // Path file yang diupload
        console.log('File path:', filePath);

        // Perbarui URL gambar di database
        const result = await pool.query(
            'UPDATE users SET profile_image = $1 WHERE email = $2 RETURNING *',
            [filePath, email]
        );

        if (result.rows.length === 0) {
            console.error('User not found in database');
            return res.status(404).json({
                status: 404,
                message: 'Profil tidak ditemukan',
                data: null,
            });
        }

        const updatedUser = result.rows[0];
        console.log('Updated user:', updatedUser);

        res.status(200).json({
            status: 0,
            message: 'Update Profile Image berhasil',
            data: {
                email: updatedUser.email,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                profile_image: `http://localhost:3000/${filePath}`,
            },
        });
    } catch (err) {
        console.error('Error during profile image update:', err.message);
        console.error(err.stack);

        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan server',
            data: null,
        });
    }
};
