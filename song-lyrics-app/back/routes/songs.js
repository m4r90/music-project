const express = require('express');
const router = express.Router();
const Song = require('../model/Song');
const { fetchSpotifyAlbumCoverAndArtistImage } = require('../services/spotifyService');
const mongoose = require('mongoose');


// Route pour obtenir les chansons avec vérification des données d'album et image de l'artiste
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find().limit(50); // Récupérer les 5 premières chansons

        const songsWithAlbumCoversAndArtistImages = await Promise.all(
            songs.map(async (song) => {
                // Récupérer les infos Spotify (album cover, nom et image de l'artiste)
                const { albumCover, albumName, artistImage } = await fetchSpotifyAlbumCoverAndArtistImage(song.title, song.artist);

                // Mise à jour uniquement des champs nécessaires
                if (albumCover || albumName || artistImage) {
                    await Song.findByIdAndUpdate(
                        song._id,
                        {
                            ...(albumCover && { albumCover }),
                            ...(albumName && { albumName }),
                            ...(artistImage && { artistImage }), // Ajouter l'image de l'artiste
                        },
                        { new: true } // Renvoie le document mis à jour
                    );
                }

                return song.toObject();
            })
        );

        res.json(songsWithAlbumCoversAndArtistImages); // Retourner les chansons mises à jour
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send('Error fetching songs');
    }
});

// Route pour obtenir les 5 premiers sons
router.get('/top-tracks', async (req, res) => {
    try {
        const topTracks = await Song.find().limit(5).exec();  // Limite aux 5 premiers sons

        const formattedTopTracks = topTracks.map(track => ({
            title: track.title,  // Titre de la chanson
            artist: track.artist,  // Nom de l'artiste
            album: track.albumName,  // Nom de l'album
            views: track.views,  // Nombre de vues
            id: track.id  // ID de la chanson
        }));

        res.json(formattedTopTracks);
    } catch (error) {
        console.error('Erreur lors de la récupération des top chansons:', error);
        res.status(500).send('Erreur lors de la récupération des top chansons');
    }
});





// Route pour mettre à jour une chanson spécifique avec son album, pochette et image de l'artiste
router.put('/songs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, artist } = req.body;

    try {
        // Vérifier si l'album, la pochette et l'image de l'artiste sont déjà présents
        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).send('Song not found');
        }

        if (song.albumName && song.albumCover && song.artistImage) {
            return res.status(200).json(song); // Retourner directement si les données existent déjà
        }

        // Sinon, récupérer les données depuis l'API Spotify
        const { albumCover, albumName, artistImage } = await fetchSpotifyAlbumCoverAndArtistImage(title, artist);

        // Mettre à jour la chanson dans la base de données
        song.albumName = albumName;
        song.albumCover = albumCover;
        song.artistImage = artistImage; // Enregistrer l'image de l'artiste
        const updatedSong = await song.save();

        res.status(200).json(updatedSong); // Retourner la chanson mise à jour
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la chanson:', error);
        res.status(500).send('Erreur lors de la mise à jour de la chanson');
    }
});

// Route pour obtenir les détails d'une chanson par ID avec mise à jour des données si nécessaire
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Convertir l'ID en nombre
        const numericId = parseInt(id, 10);

        if (isNaN(numericId)) {
            return res.status(400).send('ID invalide : doit être un nombre');
        }

        // Recherche de la chanson par le champ `id` (et non l'_id de MongoDB)
        const song = await Song.findOne({ id: numericId });

        if (!song) {
            return res.status(404).send('Chanson non trouvée');
        }

        // Vérification des informations manquantes et mise à jour si nécessaire
        if (!song.albumName || !song.albumCover || !song.artistImage) {
            const { albumCover, albumName, artistImage } = await fetchSpotifyAlbumCoverAndArtistImage(song.title, song.artist);

            if (albumCover || albumName || artistImage) {
                song.albumName = albumName || song.albumName;
                song.albumCover = albumCover || song.albumCover;
                song.artistImage = artistImage || song.artistImage;
                await song.save();
            }
        }

        res.json({
            title: song.title,
            artist: song.artist,
            albumName: song.albumName,
            albumCover: song.albumCover,
            artistImage: song.artistImage,
            lyrics: song.lyrics,
            views: song.views,
            id: song.id // ID numérique
        });

    } catch (error) {
        console.error('Erreur lors de la récupération de la chanson:', error);
        res.status(500).send('Erreur lors de la récupération de la chanson');
    }
});




module.exports = router;
