import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChartTracks.css";

class ChartTracks extends Component {
    state = {
        tracks: []
    };

    componentDidMount() {
        axios.get("http://localhost:3001/api/songs/top-tracks")
            .then(response => {
                this.setState({ tracks: response.data });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des chansons:", error);
            });
    }

    render() {
        const { tracks } = this.state;

        return (
            <div className="chart-tracks-container">
                <h2>Top Songs</h2>
                <ul className="track-list">
                    {tracks.length > 0 ? (
                        tracks.map(track => (
                            <li key={track.id} className="track-item">
                                <Link to={`/song/${track.id}`} className="track-link">
                                    <div className="track-info">
                                        <span className="track-title">{track.title}</span>
                                        <span className="track-artist">{track.artist}</span>
                                        <span className="track-album">{track.album}</span>
                                        <span className="track-views">{track.views} vues</span>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>Chargement des chansons...</p>
                    )}
                </ul>
            </div>
        );
    }
}

export default ChartTracks;
