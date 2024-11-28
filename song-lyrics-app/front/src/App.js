import React, { Component } from "react";
import NavBar from "./components/NavBar";  // Importation de la NavBar
import ChartAlbums from "./components/ChartAlbums"; // Albums uniquement
import ChartArtists from "./components/ChartArtists"; // Artistes uniquement
import ChartTracks from "./components/ChartTracks"; // Chansons uniquement
import GenreChart from "./components/GenreChart";
import "./HomePage.css"; // Fichier CSS pour le style

class HomePage extends Component {
    render() {
        return (
            <div className="home-page-container">
                <div className="nav-bar-container"> {/* Appliquer la nouvelle classe ici */}
                    <NavBar />
                </div>

                <div className="home-content-container">
                    <div className="home-content">
                        <div className="section">
                            <ChartAlbums />
                        </div>
                        <div className="section chart-tracks-container">
                            <div className="chart-tracks-wrapper">
                                <GenreChart />
                                <ChartTracks />
                            </div>
                        </div>
                        <div className="section">
                            <ChartArtists />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
