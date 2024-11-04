const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/toastr', express.static(path.join(__dirname, '../node_modules/toastr/build')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

module.exports = app;