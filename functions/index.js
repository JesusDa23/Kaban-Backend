const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');

const app = express();
admin.initializeApp({
    credential: admin.credential.cert('./credentials.json')
})
const db = admin.firestore()

// app.get('/', (req, res) => {
//     return res.status(200).json({message: 'Hello World'});
// });

app.get('/api/boards/:id', async(req, res) => {
    try {
        const doc = db.collection('boards').doc(req.params.id);
        const data = await doc.get();
        const response = data.data();
        return res.status(200).json(response)
    }
    catch (error){
        console.error(error)
        return res.status(500).send(error);
    }
})

app.post('/api/boards',async (req, res)=> {
    try {
        await db.collection('boards').doc('/' + req.body.id + '/').create({
            name: req.body.name
        })
        return res.status(200).json()
    }
    catch (error){
        console.log(error);
        return res.status(500).send(error)
    }
})

exports.app = functions.https.onRequest(app)