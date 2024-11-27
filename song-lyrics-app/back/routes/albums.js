const express = require('express');
const router = express.Router();
const Album = require('../model/Album'); // Modèle d'album

// Récupérer tous les albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find().limit(10); // Limite à 10 albums
        res.json(albums);
    } catch (error) {
        console.error('Erreur lors de la récupération des albums:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
