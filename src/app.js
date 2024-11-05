require('dotenv').config();
const express = require('express');
const path = require('path');
const { 
    createPublication, 
    readPublications, 
    updatePublication, 
    deletePublication 
} = require('./public/js/db');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/toastr', express.static(path.join(__dirname, '../node_modules/toastr/build')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

app.get('/api-url', (req, res) => {
    res.json({ apiUrl: process.env.CHUCKAPI });
});

app.get('/api/publications', async (req, res) => {
    const publications = await readPublications();
    res.json(publications);
});

app.post('/api/publications', async (req, res) => {
    const { content } = req.body;
    const publication = await createPublication(content);
    res.status(201).json(publication);
});

app.patch('/api/publications/:id', async (req, res) => {
    const { id } = req.params;
    const { isLiked } = req.body;
    const updatedPublication = await updatePublication(id, isLiked);
    res.json(updatedPublication);
});

app.delete('/api/publications/:id', async (req, res) => {
    const { id } = req.params;
    await deletePublication(id);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'));
});

module.exports = app;

