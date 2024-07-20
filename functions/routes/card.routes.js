const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

const db = admin.firestore();

router.get('/api/card', async(req, res) => {
    try {
        const query = db.collection('card');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs

        const result = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description 
        }))

        return res.status(200).json(result);
    }
    catch(error){
        return res.status(500).json();
    }
})

router.get('/api/card/:id', async(req, res) => {
    try {
        const doc = db.collection('card').doc(req.params.id);
        const data = await doc.get();
        const response = data.data();
        return res.status(200).json(response);
    }
    catch (error){
        console.error(error)
        return res.status(500).send(error);
    }
})

router.post('/api/card',async (req, res)=> {
    try {
        await db.collection('card').doc('/' + req.body.id + '/').create({
            name: req.body.name,
            description: req.body.description
        })
        return res.status(200).json()
    }
    catch (error){
        console.log(error);
        return res.status(500).send(error);
    }
})

router.delete('/api/card/:id', async (req, res)=> {
    try {
        const card = db.collection('card').doc(req.params.id);
        await card.delete();
        return res.status(200).json();
    }catch(error){
        console.error(error);
        return res.status(500).send(error);
    }
})

router.put('/api/card/:id', async (req,res) => {
    try {
        const card = db.collection('card').doc(req.params.id);
        await card.update({
            name: req.body.name,
            description: req.body.description
        });
        return res.status(200).json();
    }catch (error){
        console.error(error);
        return res.status(500).send(error);
    }
})

module.exports = router;