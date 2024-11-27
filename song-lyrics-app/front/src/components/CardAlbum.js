import React from "react";
import "./CardAlbum.css"; // Fichier CSS à créer

const CardAlbum = ({ album }) => {
    return (
        <div className="card-album">
            <img src={album.albumCover} alt={album.title} className="album-cover" />
            <div className="album-info">
                <h3>{album.title}</h3>
                <p>{album.albumName}</p>
            </div>
        </div>
    );
};

export default CardAlbum;
