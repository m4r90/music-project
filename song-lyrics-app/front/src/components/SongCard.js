import React from 'react';

const SongCard = ({ title, artist, albumCover }) => {
  return (
    <div style={styles.card}>
      <img src={albumCover || 'https://via.placeholder.com/150'} alt={`${title} cover`} style={styles.image} />
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    width: '150px',
    margin: '10px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
};

export default SongCard;
