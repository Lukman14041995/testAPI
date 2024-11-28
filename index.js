
const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    res.status(201).send({ message: 'User registered successfully' });
});
