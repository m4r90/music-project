import React, { useEffect, useState } from 'react';
import { fetchSongs, fetchSpotifyAlbumCover } from './services/songs';
import SongCard from './components/SongCard';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [covers, setCovers] = useState({});

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songsData = await fetchSongs();
        setSongs(songsData);

        // Fetch album covers for each song
        const coversData = {};
        for (const song of songsData) {
          const coverUrl = await fetchSpotifyAlbumCover(song.title);
          coversData[song._id] = coverUrl;
        }
        setCovers(coversData);
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadSongs();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Song List</h1>
      <div style={styles.grid}>
        {songs.map((song) => (
          <SongCard
            key={song._id}
            title={song.title}
            artist={song.artist}
            albumCover={covers[song._id]}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default App;
