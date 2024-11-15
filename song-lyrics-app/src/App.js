import React, { useEffect, useState } from 'react';
import './index.css'; // Import the CSS file

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/songs')  // API endpoint
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="songs-container">
      <h1>Song Statistics & Recommendations</h1>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="songs-list">
          {songs.map((song, index) => (
            <div key={index} className="song-card">
              <h2>{song.title}</h2>
              <p><strong>Artist:</strong> {song.artist}</p>
              <p><strong>Year:</strong> {song.year}</p>
              <p className="lyrics"><strong>Lyrics:</strong> {song.lyrics}</p>
              <button className="recommend-btn">Get Recommendations</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongsList;
