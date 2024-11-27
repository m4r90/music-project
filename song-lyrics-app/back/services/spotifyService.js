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

// Fonction pour récupérer la pochette de l'album
const fetchSpotifyAlbumCover = async (songTitle, artistName) => {
    try {
        const token = await getSpotifyToken();
        if (!token) {
            console.error("Token Spotify invalide ou inexistant");
            return null;
        }

        const query = `${encodeURIComponent(songTitle)} artist:${encodeURIComponent(artistName)}`;
        console.log(`Requête Spotify pour la chanson: ${query}`);

        // Requête à l'API Spotify pour obtenir les informations de la chanson
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${query}&type=track`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Réponse Spotify pour la chanson:', response.data);

        if (response.data && response.data.tracks.items.length > 0) {
            const track = response.data.tracks.items[0];
            const albumCover = track.album.images[0]?.url || null; // Pochette de l'album
            return albumCover;
        } else {
            console.warn('Aucune chanson trouvée');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la pochette de l\'album:', error);
        return null;
    }
};

// Fonction pour récupérer l'image de l'artiste avec l'ID de l'artiste
const fetchSpotifyArtistImage = async (artistName) => {
    try {
        const token = await getSpotifyToken();
        if (!token) {
            console.error("Token Spotify invalide ou inexistant");
            return null;
        }

        // Remplacer les apostrophes et autres caractères spéciaux dans le nom de l'artiste
        const query = encodeURIComponent(artistName);
        console.log(`Recherche Spotify pour l'artiste: ${query}`);

        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=artist:${query}&type=artist&limit=5`, // Limiter à 5 résultats
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Réponse Spotify pour l\'artiste:', response.data);

        if (response.data && response.data.artists.items.length > 0) {
            const artist = response.data.artists.items[0]; // Prendre le premier artiste trouvé
            const artistImage = artist.images[0]?.url || null; // Image de l'artiste
            return artistImage;
        } else {
            console.warn('Aucun artiste trouvé');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image de l\'artiste:', error);
        return null;
    }
};

// Fonction principale ajustée pour récupérer la pochette de l'album et l'image de l'artiste
const fetchSpotifyAlbumCoverAndArtistImage = async (songTitle, artistName) => {
    try {
        const token = await getSpotifyToken();
        if (!token) {
            console.error("Token Spotify invalide ou inexistant");
            return { albumCover: null, albumName: null, artistImage: null };
        }

        // Première requête pour récupérer la pochette de l'album
        const albumCover = await fetchSpotifyAlbumCover(songTitle, artistName);
        console.log('Album cover:', albumCover);

        // Recherche de l'artiste directement avec le nom
        const artistImage = await fetchSpotifyArtistImage(artistName);
        console.log('Artist image:', artistImage);

        return { albumCover, albumName: artistName, artistImage };
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return { albumCover: null, albumName: null, artistImage: null };
    }
};


module.exports = { fetchSpotifyAlbumCoverAndArtistImage };
