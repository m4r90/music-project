const express = require('express');
const Song = require('../model/Song');

const router = express.Router();

// Route: GET /api/songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().limit(5); // Fetch the first 5 songs
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
});

module.exports = router;
