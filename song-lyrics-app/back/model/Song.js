const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number,
  tag: String,
  views: Number,
  features: {
    type: String,
    set: (val) => (typeof val === 'object' ? JSON.stringify(val) : val) // Convertit en chaîne si objet
  },
  lyrics: String,
  id: Number,
  language: String,
  albumName: String,
  albumCover: String,
  artistImage: String, // Ajout du champ pour l'image de l'artiste
});

module.exports = mongoose.model('Song', songSchema);



