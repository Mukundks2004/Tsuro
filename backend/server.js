// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.get('/goodbye', (req, res) => {
    res.json({ message: 'Goodbye World' });
});

app.get('/wow', (req, res) => {
    res.json({ message: 'Wow sadness' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
