const functions = require('firebase-functions');
const express = require("express");

const app = express();

app.get('/hello', (req, res) => {
    return res.status(200).json({message: 'hello world'});
});

exports.app = functions.https.onRequest(app);

