// Create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred while reading the file');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            res.status(500).send('An error occurred while reading the file');
        } else {
            let comments = JSON.parse(data);
            let newComment = {
                id: comments.length + 1,
                body: req.body.body
            };
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.status(500).send('An error occurred while writing the file');
                } else {
                    res.send(newComment);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// Run the server with node comments.js
// Test the server with Postman
// Create a