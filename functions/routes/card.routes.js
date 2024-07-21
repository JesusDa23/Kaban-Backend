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
            state: doc.data().state
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
        const newCard = {
            name: req.body.name,
            state: req.body.state
        };
        await db.collection('card').add(newCard);
        return res.status(201).json(newCard);
    } catch (error) {
        console.error(error);
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
        const cardId = req.params.id;
        if (!cardId) {
            return res.status(400).send('Card ID is required');
        }

        const updatedCard = {
            name: req.body.name,
            state: req.body.state
        };

        await db.collection('card').doc(cardId).update(updatedCard);
        return res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
})

module.exports = router;