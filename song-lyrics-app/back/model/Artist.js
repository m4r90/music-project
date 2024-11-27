const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String },
    biography: { type: String },    // Facultatif
    photo: { type: String },        // URL de la photo
    spotifyId: { type: String },    // ID Spotify (si nécessaire)
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] // Relation avec les albums
});

module.exports = mongoose.model('Artist', ArtistSchema);
