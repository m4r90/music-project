import React from "react";
import "./Card.css"; // Fichier CSS pour le style

const Card = ({ artist }) => {
    return (
        <div className="card-artist">
            <img src={artist.artistImage || "default-artist.png"} alt={artist.name} className="artist-image" />
            <div className="artist-info">
                <h3>{artist.artist}</h3>
            </div>
        </div>
    );
};

export default Card;
