const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h2>Download File</h2>
        <a href="/download">Click here to download the file</a>
    `);
});

app.get('/download', (req, res) => {
    const filePath = path.join(__dirname, 'abc.txt');
    res.download(filePath, 'myFile.txt', (err) => {
        if (err) {
            res.status(500).send('File download failed!');
        }
    });
});

app.listen(2000, () => {
    console.log('Server running at http://localhost:2000/');
});
