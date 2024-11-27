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

    render() {
        const { albums, loading, error } = this.state;

        if (loading) return <Loading />;
        if (error) return <p>{error}</p>;

        return (
            <div>
                <h1>Trending Albums</h1>
                <div className="albums-container">
                    {albums.map((album) => (
                        <CardAlbum key={album.id} album={album} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ChartAlbums;
