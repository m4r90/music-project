const express = require('express');
const router = express.Router();
const Song = require('../model/Song');
const { fetchSpotifyAlbumCover } = require('../services/spotifyService');

// Route pour obtenir les chansons et leur pochette d'album
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find().limit(5); // Récupérer les 5 premières chansons de la base de données
        const songsWithAlbumCovers = await Promise.all(
            songs.map(async (song) => {
                const { albumCover, albumName } = await fetchSpotifyAlbumCover(song.title, song.artist);
                return { ...song.toObject(), albumCover, albumName };  // Ajouter la pochette et le nom de l'album
            })
        );
        res.json(songsWithAlbumCovers);  // Retourner les chansons avec leur pochette et nom d'album
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send('Error fetching songs');
    }
});

// Route pour mettre à jour une chanson avec son album et sa pochette
router.put('/songs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, artist } = req.body; // Extrait le titre et l'artiste de la chanson envoyés

    try {
        // Récupérer la pochette et le nom de l'album depuis Spotify
        const { albumCover, albumName } = await fetchSpotifyAlbumCover(title, artist);

        // Mettre à jour la chanson dans la base de données avec les nouvelles informations
        const updatedSong = await Song.findByIdAndUpdate(
            id, // ID de la chanson à mettre à jour
            {
                albumName: albumName,
                albumCover: albumCover
            },
            { new: true } // Renvoie le document mis à jour
        );

        res.status(200).json(updatedSong); // Retourner la chanson mise à jour
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la chanson:', error);
        res.status(500).send('Erreur lors de la mise à jour de la chanson');
    }
});

module.exports = router;
