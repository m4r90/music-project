import React from "react";
import "./GenreChart.css"; // Assure-toi d'importer ton fichier CSS

const GenreChart = () => {
    return (
        <div className="genre-chart-container">
            <h2>Trending Genre</h2>
            <div className="image-wrapper">
                <img src="images/doom.jpg" alt="Genre" className="genre-image" />
                <div className="text-overlay">
                    <h2 className="textGenre">Rap</h2>
                </div>
            </div>
        </div>
    );
};

export default GenreChart;
