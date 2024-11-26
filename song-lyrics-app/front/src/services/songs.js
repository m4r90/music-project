import axios from 'axios';

// Fetch songs from the backend
export const fetchSongs = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/songs');
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Fetch album cover from Spotify API
export const fetchSpotifyAlbumCover = async (songTitle) => {
  const SPOTIFY_TOKEN = 'BQB4UyLpkKR9TpaWgqtWrRG-bImqbFB4JEaGJY2vBTVsZDuGXbi9Fz9yPtFytpJcNul7_bDxmMHV_G5E_ftu3csY-KLf2qS7q2nfk4zo3SBVWri9CJc'; // Remplace par ton token Spotify
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(songTitle)}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${SPOTIFY_TOKEN}`,
        },
      }
    );

    // Retourne l'URL de la pochette si trouvée
    const track = response.data.tracks.items[0];
    return track ? track.album.images[0].url : null;
  } catch (error) {
    console.error('Error fetching Spotify album cover:', error);
    return null;
  }
};
