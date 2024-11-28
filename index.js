// Import express
const express = require('express');
const app = express();

// Middleware untuk parsing JSON body
app.use(express.json());

// Hello World endpoint
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Set port untuk server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Lakukan validasi dan simpan data ke database
    res.status(201).send({ message: 'User registered successfully' });
});
