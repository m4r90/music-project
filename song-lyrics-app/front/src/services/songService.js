import axios from 'axios';

// Fonction pour récupérer les chansons
export const fetchSongs = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/songs');
    return response.data.map(song => ({
      ...song,
      albumCover: song.albumCover || null, // Ajoute l'album cover si disponible
      albumName: song.albumName || null // Ajoute le nom de l'album si disponible
    }));
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};
