require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/toastr', express.static(path.join(__dirname, '../node_modules/toastr/build')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

app.get('/api-url', (req, res) => {
    res.json({ apiUrl: process.env.CHUCKAPI });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

module.exports = app;
