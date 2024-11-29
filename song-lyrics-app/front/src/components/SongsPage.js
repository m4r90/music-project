import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./SongsPage.css";

function SongsPage() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await axios.get("http://localhost:3001/api/songs");
                setSongs(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération des chansons.");
            } finally {
                setLoading(false);
            }
        }
        fetchSongs();
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    if (!songs.length) return <p>Aucune chanson trouvée.</p>;

    return (
        <div className="songs-page-container">
            <div className="nav-bar-container">
                <NavBar />
            </div>
            <div className="songs-content-container">
                <h1>Liste des chansons</h1>
                <div className="songs-list">
                    {songs.map((song) => (
                        <div key={song.id} className="song-card">
                            <Link to={`/songs/${song.id}`} className="song-link">
                                <img
                                    src={song.albumCover}
                                    alt={`${song.albumName} cover`}
                                    className="album-cover"
                                />
                                <div className="song-info">
                                    <p className="song-title">{song.title}</p>
                                    <p className="artist-name">{song.artist}</p>
                                    <p className="album-name">{song.albumName}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SongsPage;
