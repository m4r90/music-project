const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releaseDate: { type: Date },
    genre: { type: String },
    albumCover: { type: String }, // URL de la pochette
    spotifyId: { type: String },  // ID Spotify (si nécessaire)
    tracks: [{ type: String }]    // Liste des titres (facultatif)
});

module.exports = mongoose.model('Album', AlbumSchema);
