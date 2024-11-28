import React from "react";
import "./CardAlbum.css"; // Fichier CSS à créer

const CardAlbum = ({ album }) => {
    return (
        <div className="card-album">
            <img src={album.albumCover} alt={album.title} className="album-cover" />
            <div className="album-info">
                <p>{album.albumName}</p>
                <h3>{album.artist}</h3>
            </div>
        </div>
    );
};

export default CardAlbum;
