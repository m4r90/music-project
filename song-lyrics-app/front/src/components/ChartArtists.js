import React, { Component } from "react";
import axios from "axios"; // Utiliser Axios pour l'API
import Loading from "./Loading";
import Card from "./Card";
import './ChartArtists.css'; // Si tu utilises un fichier CSS dédié

class ChartArtists extends Component {
    state = {
        artists: [],
        loading: true,
        error: null,
    };

    async componentDidMount() {
        try {
            const response = await axios.get('http://localhost:3001/api/songs'); // Appel à la route générale des chansons
            const artists = response.data
                .filter(song => song.albumCover && song.albumName) // Filtrer les chansons avec des informations sur l'album
                .map(song => ({
                    artist: song.artist,
                    albumCover: song.albumCover,
                    id: song._id,
                }));

            this.setState({ artists, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    render() {
        const { artists, loading, error } = this.state;

        if (loading) return <Loading />;
        if (error) return <p>{error}</p>;

        return (
            <div>
                <h1>Featured Artists</h1>
                <div className="artists-container">
                    {artists.map((artist) => (
                        <Card key={artist.id} artist={artist} />
                    ))}
                </div>
            </div>
        );
    }
}

export default ChartArtists;
