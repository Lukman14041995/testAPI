const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 108,
            message: 'Token tidak valid atau kadaluwarsa',
            data: null,
        });
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(401).json({
                status: 108,
                message: 'Token tidak valid atau kadaluwarsa',
                data: null,
            });
        }

        req.user = user; // Simpan informasi pengguna dari token
        next();
    });
};

module.exports = authenticateToken;
