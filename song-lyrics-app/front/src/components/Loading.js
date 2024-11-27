import React from "react";
import "./Loading.css"; // Assurez-vous que ce fichier existe

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
