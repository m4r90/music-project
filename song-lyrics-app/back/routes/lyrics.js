const express = require('express');
const Song = require('../model/Song'); // Importation du modèle Song
const router = express.Router();

router.get('/en', async (req, res) => {
    try {
        const { page = 1, limit = 1000 } = req.query;
        const skip = (page - 1) * limit;

        const songs = await Song.find(
            { language: 'en' },
            'tag lyrics' // Projection : uniquement 'tag' et 'lyrics'
        )
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const totalSongs = await Song.countDocuments({ language: 'en' });

        res.status(200).json({
            total: totalSongs,
            page: parseInt(page),
            limit: parseInt(limit),
            songs,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des chansons :', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

module.exports = router;