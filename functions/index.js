const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin')
const cors = require('cors');


const app = express();
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert('./credentials.json')
})

// app.get('/', (req, res) => {
//     return res.status(200).json({message: 'Hello World'});
// });

app.use(require('./routes/card.routes'))

exports.app = functions.https.onRequest(app)