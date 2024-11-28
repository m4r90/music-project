const axios = require('axios');
const fs = require('fs');

// URL de la route créée pour récupérer les chansons en anglais
const apiUrl = 'http://localhost:3001/api/lyrics/en';

const exportToJson = async () => {
    try {
        const response = await axios.get(apiUrl);
        const songs = response.data;

        fs.writeFileSync('songs_lyrics_en.json', JSON.stringify(songs, null, 2), 'utf-8');
        console.log('Données exportées avec succès dans songs_lyrics_en.json');
    } catch (error) {
        console.error('Erreur lors de l\'exportation des données:', error);
    }
};

exportToJson();
