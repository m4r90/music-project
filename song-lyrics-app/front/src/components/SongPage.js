import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import "./SongPage.css";

function SongPage() {
    const { id } = useParams();
    const [song, setSong] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchSong() {
            try {
                const response = await axios.get(`http://localhost:3001/api/songs/${id}`);
                setSong(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de la chanson:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSong();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!song) return <p>Chanson non trouvée.</p>;

    return (
        <div className="song-page">
            <div className="nav-bar-container">
                <NavBar />
            </div>
            <div className="song-header">
                <img className="album-cover" src={song.albumCover} alt={`${song.albumName} cover`} />
                <div className="song-details">
                    <h1 className="song-title">{song.title}</h1>
                    <p className="artist-name">{song.artist}</p>
                    <p className="album-name">Album: {song.albumName}</p>
                    <p className="views-count">{song.views} vues</p>
                </div>
            </div>
            <div className="song-lyrics">
                <h2>Paroles</h2>
                <pre>{song.lyrics}</pre>
            </div>
        </div>
    );
}

export default SongPage;
