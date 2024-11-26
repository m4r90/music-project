const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number,
  tag: String,
  views: Number,
  features: String,
  lyrics: String,
  id: Number,
  language: String,
  albumName: String,
  albumCover: String,
});

module.exports = mongoose.model('Song', songSchema);
