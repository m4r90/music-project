import React, { Component } from "react";
import axios from "axios"; // Utiliser Axios pour l'API
import Loading from "./Loading";
import CardAlbum from "./CardAlbum";
import "./ChartAlbums.css";

class ChartAlbums extends Component {
    state = {
        albums: [], // Contiendra des albums extraits des chansons
        loading: true,
        error: null,
        scrollPosition: 0, // Position actuelle du défilement (index du premier album visible)
    };

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:3001/api/songs'); // Appel à la route générale des chansons
            const albums = response.data
                .filter(song => song.albumCover && song.albumName) // Filtrer les chansons avec des informations sur l'album
                .map(song => ({
                    albumName: song.albumName,
                    albumCover: song.albumCover,
                    artist: song.artist,
                    id: song._id,
                }));

            // Supprimer les doublons d'albums (basé sur l'albumName)
            const uniqueAlbums = Array.from(new Set(albums.map(a => a.albumName)))
                .map(name => {
                    return albums.find(a => a.albumName === name);
                });

            this.setState({ albums: uniqueAlbums, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    // Fonction pour défiler vers la gauche (un album à la fois)
    scrollLeft = () => {
        this.setState(prevState => {
            const newScrollPosition = Math.max(prevState.scrollPosition - 1, 0); // Limiter la position de défilement à 0
            const container = document.querySelector(".albums-container");
            container.scrollLeft -= container.offsetWidth / 6; // Défilement par un seul album
            return { scrollPosition: newScrollPosition };
        });
    };

    // Fonction pour défiler vers la droite (un album à la fois)
    scrollRight = () => {
        const maxScrollPosition = Math.max(0, this.state.albums.length - 6); // Limiter la position max
        this.setState(prevState => {
            const newScrollPosition = Math.min(prevState.scrollPosition + 1, maxScrollPosition);
            const container = document.querySelector(".albums-container");
            container.scrollLeft += container.offsetWidth / 6; // Défilement par un seul album
            return { scrollPosition: newScrollPosition };
        });
    };

    render() {
        const { albums, loading, error, scrollPosition } = this.state;

        if (loading) return <Loading />;
        if (error) return <p>{error}</p>;

        const albumsToDisplay = albums.slice(scrollPosition, scrollPosition + 6); // Afficher 6 albums à la fois

        return (
            <div className="container">
                <h1>Trending Albums</h1>

                {/* Ajouter les boutons de défilement uniquement si le nombre d'albums est supérieur à 6 */}
                {albums.length > 6 && (
                    <div className="scroll-buttons">
                        <button onClick={this.scrollLeft} className="scroll-left">
                            &lt;
                        </button>
                        <button onClick={this.scrollRight} className="scroll-right">
                            &gt;
                        </button>
                    </div>
                )}

                <div className="albums-container">
                    {albumsToDisplay.map((album) => (
                        <CardAlbum key={album.id} album={album} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ChartAlbums;
