const express = require('express');
const router = express.Router();
const Artist = require('../model/Artist'); // Modèle d'artiste

// Récupérer tous les artistes
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find().limit(10); // Limite à 10 artistes
        res.json(artists);
    } catch (error) {
        console.error('Erreur lors de la récupération des artistes:', error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
