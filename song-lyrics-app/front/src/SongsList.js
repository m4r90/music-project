import React, { useEffect, useState } from 'react';
import './index.css'; // Importer les styles globaux

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/songs') // Appel à l'API Flask
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des chansons');
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="songs-container">
      <h1>Liste des chansons</h1>
      <div className="songs-list">
        {songs.map((song, index) => (
          <div key={index} className="song-card">
            <h2>{song.title}</h2>
            <p><strong>Artiste :</strong> {song.artist}</p>
            <p><strong>Année :</strong> {song.year}</p>
            <p className="lyrics"><strong>Paroles :</strong> {song.lyrics.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongsList;
