// components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

// Composant NavBar
const NavBar = () => {
    return (
        <nav>
            <div className="logo-container">
                <img src="/images/logoAudivi.png" alt="Audivi Logo" className="logo" />
            </div>

            <div className="separator"></div>

            <ul>
                <li>
                    <Link to="/">
                        <img src="/assets/icons/home-icon.svg" alt="Home Icon" width="20" height="20"/>
                        Home
                    </Link>
                </li>
                <div className="separator"></div>
                <li>
                    <Link to="/albums">
                        <img src="/assets/icons/albums-icon.svg" alt="Albums Icon" width="20" height="20"/>
                        Albums
                    </Link>
                </li>
                <li>
                    <Link to="/artists">
                        <img src="/assets/icons/artists-icon.svg" alt="Artists Icon" width="20" height="20"/>
                        Artists
                    </Link>
                </li>
                <li>
                    <Link to="/songs">
                        <img src="/assets/icons/songs-icon.svg" alt="About Icon" width="20" height="20"/>
                        Songs
                    </Link>
                </li>
                <div className="separator"></div>
                <li>
                    <Link to="/statistics">
                        <img src="/assets/icons/statistics-icon.svg" alt="Statistics Icon" width="20" height="20"/>
                        Statistics
                    </Link>
                </li>
                <li>
                    <Link to="/billboard">
                        <img src="/assets/icons/billboard-icon.svg" alt="Billboard Icon" width="20" height="20"/>
                        Billboard
                    </Link>
                </li>
                <li>
                    <Link to="/machineLearning">
                        <img src="/assets/icons/robot-icon.svg" alt="Billboard Icon" width="20" height="20"/>
                        Augur
                    </Link>
                </li>
            </ul>
        </nav>
    );
}


export default NavBar;
