const axios = require('axios');
let spotifyToken = null;
let tokenExpirationTime = 0;

const SPOTIFY_CLIENT_ID = '7c24fbb569e24cbd99ef214213a29302';
const SPOTIFY_CLIENT_SECRET = 'b09f1f67ea2b45818caee8b91f00a738';

// Fonction pour obtenir un nouveau token Spotify
const fetchSpotifyToken = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: SPOTIFY_CLIENT_ID,
                client_secret: SPOTIFY_CLIENT_SECRET,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        spotifyToken = response.data.access_token;
        tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Convertir expiration en ms
        console.log('Spotify Token fetched');
    } catch (error) {
        console.error('Error fetching Spotify token:', error);
        throw error;
    }
};

// Fonction pour récupérer le token ou le rafraîchir
const getSpotifyToken = async () => {
    if (!spotifyToken || Date.now() >= tokenExpirationTime) {
        await fetchSpotifyToken();
    }
    return spotifyToken;
};

// Fonction pour récupérer la pochette de l'album et l'image de l'artiste
const fetchSpotifyAlbumCoverAndArtistImage = async (songTitle, artistName) => {
    try {
        // Vérification ou rafraîchissement du token
        const token = await getSpotifyToken();
        if (!token) {
            console.error("Token Spotify invalide ou inexistant");
            return { albumCover: null, albumName: null, artistImage: null };
        }

        // Construction de la requête pour rechercher la chanson et l'artiste
        const query = `${encodeURIComponent(songTitle)} artist:${encodeURIComponent(artistName)}`;
        console.log(`Requête Spotify: ${query}`);

        // Envoi de la requête à l'API Spotify
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${query}&type=track,artist`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Réponse Spotify:', response.data.artists);

        // Vérification des résultats pour la chanson
        if (response.data && response.data.tracks && response.data.tracks.items.length > 0) {
            const track = response.data.tracks.items[0];
            const albumCover = track.album.images[0]?.url || null;  // Pochette de l'album
            const albumName = track.album.name || null;

            // Recherche de l'artiste dans la réponse
            const artist = response.data.artists.items.find(a => a.name.toLowerCase() === artistName.toLowerCase());
            const artistImage = artist?.images[0]?.url || null;  // Image de l'artiste

            return { albumCover, albumName, artistImage };
        } else {
            console.warn('Aucune piste trouvée');
            return { albumCover: null, albumName: null, artistImage: null };
        }
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération de la pochette de l\'album, du nom de l\'album ou de l\'image de l\'artiste:', error);
        return { albumCover: null, albumName: null, artistImage: null };
    }
};

module.exports = { fetchSpotifyAlbumCoverAndArtistImage };
