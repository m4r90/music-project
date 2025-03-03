const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/songs');
const statisticsRoutes = require('./routes/statistics');
const billboardRoutes = require('./routes/billboard');
const lyricsRoutes = require('./routes/lyrics');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/songs', songRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/billboard', billboardRoutes);
app.use('/api/lyrics', lyricsRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/songs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
