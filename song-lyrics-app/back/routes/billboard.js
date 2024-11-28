const express = require('express');
const Song = require('../model/Song'); // Importation du modèle Song
const router = express.Router();


router.get('/top-artists', async (req, res) => {
    try {
        // Agrégation pour obtenir les top 10 artistes par nombre de vues
        const topArtists = await Song.aggregate([
            { $group: { _id: "$artist", totalViews: { $sum: "$views" } } },
            { $sort: { totalViews: -1 } },  // Trie par nombre de vues décroissant
            { $limit: 10 }  // Limite les résultats au top 10
        ]).exec();

        // Reformater les données avant de les envoyer à React
        const formattedTopArtists = topArtists.map(artist => ({
            name: artist._id,  // Le nom de l'artiste
            views: artist.totalViews,  // Le total des vues de l'artiste
        }));

        res.json(formattedTopArtists);
    } catch (error) {
        console.error('Erreur lors de la récupération des top artistes:', error);
        res.status(500).send('Erreur lors de la récupération des top artistes');
    }
});


router.get('/top-tracks', async (req, res) => {
    try {
        const topTracks = await Song.aggregate([
            { $group: { _id: "$title", totalViews: { $sum: "$views" } } },
            { $sort: { totalViews: -1 } },
            { $limit: 10 }
        ]).exec();

        // Reformater les données avant de les envoyer à React
        const formattedTopTracks = topTracks.map(track => ({
            title: track._id,  // Le titre de la chanson
            views: track.totalViews,  // Le total des vues de la chanson
        }));

        res.json(formattedTopTracks);
    } catch (error) {
        console.error('Erreur lors de la récupération des top musiques:', error);
        res.status(500).send('Erreur lors de la récupération des top musiques');
    }
});


router.get('/top-genres', async (req, res) => {
    try {
        const topGenres = await Song.aggregate([
            { $group: { _id: "$tag", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]).exec();

        // Reformater les données avant de les envoyer à React
        const formattedTopGenres = topGenres.map(genre => ({
            name: genre._id,  // Le nom du genre
            count: genre.count,  // Le nombre de musiques pour ce genre
        }));

        res.json(formattedTopGenres);
    } catch (error) {
        console.error('Erreur lors de la récupération des top genres:', error);
        res.status(500).send('Erreur lors de la récupération des top genres');
    }
});

router.get('/top-albums', async (req, res) => {
    try {
        // Agrégation pour obtenir le top 10 des albums par total de vues
        const topAlbums = await Song.aggregate([
            { $group: { _id: "$albumName", totalViews: { $sum: "$views" } } },  // Regroupe par album et somme les vues
            { $sort: { totalViews: -1 } },  // Trie par nombre de vues décroissant
            { $limit: 10 }  // Limite aux 10 premiers albums
        ]).exec();

        // Reformater les résultats avant de les envoyer au client
        const formattedTopAlbums = topAlbums.map(album => ({
            name: album._id,  // Nom de l'album
            views: album.totalViews,  // Total des vues pour l'album
        }));

        res.json(formattedTopAlbums);
    } catch (error) {
        console.error('Erreur lors de la récupération des top albums:', error);
        res.status(500).send('Erreur lors de la récupération des top albums');
    }
});







module.exports = router;
