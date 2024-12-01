const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const pool = require('../config/db').pool; // Pastikan path ke `db.js` benar

// Fungsi untuk registrasi user
exports.registerUser = [
    check('email').isEmail().withMessage('Email tidak sesuai format'),
    check('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 102,
                message: errors.array()[0].msg,
                data: null,
            });
        }

        const { email, first_name, last_name, password } = req.body;

        try {
            const existingUser = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (existingUser.rows.length > 0) {
                return res.status(400).json({
                    status: 103,
                    message: 'Email sudah terdaftar',
                    data: null,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const result = await pool.query(
                'INSERT INTO users(email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *',
                [email, first_name, last_name, hashedPassword]
            );

            res.status(201).json({
                status: 0,
                message: 'Registrasi berhasil, silahkan login',
                data: {
                    id: result.rows[0].id,
                    email: result.rows[0].email,
                    first_name: result.rows[0].first_name,
                    last_name: result.rows[0].last_name,
                },
            });
            
        } catch (err) {
            console.error('Error during registration:', err.message);
            res.status(500).json({
                status: 500,
                message: 'Terjadi kesalahan server',
                data: null,
            });
        }
    },
];

// Fungsi untuk login user (contoh jika ada)
exports.loginUser = [
    // Validasi input
    check('email').isEmail().withMessage('Email tidak sesuai format'),
    check('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter'),

    async (req, res) => {
        // Validasi input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Validation Error:', errors.array());
            return res.status(400).json({
                status: 102,
                message: errors.array()[0].msg,
                data: null,
            });
        }

        const { email, password } = req.body;

        try {
            console.log('Email:', email); // Debug email
            console.log('Password:', password); // Debug password

            // Cari pengguna berdasarkan email
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            console.log('Query Result:', result.rows); // Debug query result

            if (result.rows.length === 0) {
                console.error('User not found:', email);
                return res.status(401).json({
                    status: 103,
                    message: 'Username atau password salah',
                    data: null,
                });
            }

            const user = result.rows[0];
            console.log('User Found:', user); // Debug user data

            // Bandingkan password dengan hash
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log('Password Valid:', isPasswordValid); // Debug password validation

            if (!isPasswordValid) {
                console.error('Invalid Password for Email:', email);
                return res.status(401).json({
                    status: 103,
                    message: 'Username atau password salah',
                    data: null,
                });
            }

            // Jika berhasil login, buat token JWT
            const jwt = require('jsonwebtoken'); // Pastikan `jsonwebtoken` diimpor
            const token = jwt.sign(
                { id: user.id, email: user.email },
                'your_jwt_secret', // Ganti dengan secret key Anda
                { expiresIn: '12h' }
            );

            console.log('Generated Token:', token); // Debug token

            res.status(200).json({
                status: 0,
                message: 'Login berhasil',
                data: {
                    token,
                },
            });
        } catch (err) {
            console.error('Error during login:', err.message);
            console.error(err.stack);

            res.status(500).json({
                status: 500,
                message: 'Terjadi kesalahan server',
                data: null,
            });
        }
    },
];
