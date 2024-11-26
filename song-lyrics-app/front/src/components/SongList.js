import React, { useEffect, useState } from 'react';
import { fetchSongs } from '../services/songService';

const SongList = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const songList = await fetchSongs();
                setSongs(songList);
            } catch (error) {
                console.error('Error fetching song list:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Song List</h1>
            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                {songs.map((song) => (
                    <div key={song._id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                        <img src={song.albumCover || 'default-placeholder.png'} alt={song.title} style={{ width: '100%' }} />
                        <h2>{song.title}</h2>
                        <p>{song.artist}</p>
                        <p>{song.albumName}</p> {/* Affiche le nom de l'album */}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default SongList;
