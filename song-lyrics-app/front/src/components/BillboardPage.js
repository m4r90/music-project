import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';  // Pour les animations
import './BillboardPage.css';
import NavBar from './NavBar.js';  // Reuse la barre de navigation

function BillboardPage() {
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [activeCategory, setActiveCategory] = useState('artists'); // Catégorie active

    // Fonction pour récupérer les données depuis l'API et les stocker dans le localStorage
    const fetchData = async () => {
        // Vérifier si les données existent déjà dans le localStorage
        const storedTopArtists = localStorage.getItem('topArtists');
        const storedTopTracks = localStorage.getItem('topTracks');
        const storedTopGenres = localStorage.getItem('topGenres');

        if (storedTopArtists) {
            setTopArtists(JSON.parse(storedTopArtists));
        } else {
            const response = await axios.get('http://localhost:3001/api/billboard/top-artists');
            setTopArtists(response.data);
            localStorage.setItem('topArtists', JSON.stringify(response.data));
        }

        if (storedTopTracks) {
            setTopTracks(JSON.parse(storedTopTracks));
        } else {
            const response = await axios.get('http://localhost:3001/api/billboard/top-tracks');
            setTopTracks(response.data);
            localStorage.setItem('topTracks', JSON.stringify(response.data));
        }

        if (storedTopGenres) {
            setTopGenres(JSON.parse(storedTopGenres));
        } else {
            const response = await axios.get('http://localhost:3001/api/billboard/top-genres');
            setTopGenres(response.data);
            localStorage.setItem('topGenres', JSON.stringify(response.data));
        }
    };

    // Charger les données au montage du composant
    useEffect(() => {
        fetchData();
    }, []);

    const slideIn = useSpring({
        transform: activeCategory === 'artists' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeCategory === 'artists' ? 1 : 0,
    });

    const slideTracks = useSpring({
        transform: activeCategory === 'tracks' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeCategory === 'tracks' ? 1 : 0,
    });

    const slideGenres = useSpring({
        transform: activeCategory === 'genres' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeCategory === 'genres' ? 1 : 0,
    });

    return (
        <div className="billboard-container">
            <div className="nav-bar-container"> {/* Appliquer la nouvelle classe ici */}
                <NavBar/>
            </div>
            <h1>Billboard Top Charts</h1>

            <div className="nav-bar">
                <button className={`nav-btn ${activeCategory === 'artists' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('artists')}>
                    Top Artistes
                </button>
                <button className={`nav-btn ${activeCategory === 'tracks' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('tracks')}>
                    Top Musiques
                </button>
                <button className={`nav-btn ${activeCategory === 'genres' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('genres')}>
                    Top Genres
                </button>
            </div>

            <animated.div style={slideIn} className="chart-container">
                <h2>Top 10 Artistes avec le plus de vues</h2>
                <ul className="chart-list">
                    {topArtists.map((artist, index) => (
                        <li key={index}>
                            <div className="list-item">
                                <img
                                    src={`/images/top-${index + 1}.svg`}  // Image spécifique à chaque artiste
                                    alt={artist.name}
                                    className="list-item-image"
                                />
                                <span>{artist.name} - {artist.views} vues</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </animated.div>

            {/* Afficher les Top Tracks */}
            <animated.div style={slideTracks} className="chart-container">
                <h2>Top 10 Musiques avec le plus de vues</h2>
                <ul className="chart-list">
                    {topTracks.map((track, index) => (
                        <li key={index}>
                            <div className="list-item">
                                <img
                                    src={`/images/top-${index + 1}.svg`}  // Image spécifique à chaque morceau
                                    alt={track.title}
                                    className="list-item-image"
                                />
                                <span>{track.title} - {track.views} vues</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </animated.div>

            {/* Afficher les Top Genres */}
            <animated.div style={slideGenres} className="chart-container">
                <h2>Top 10 Genres les plus populaires</h2>
                <ul className="chart-list">
                    {topGenres.map((genre, index) => (
                        <li key={index}>
                            <div className="list-item">
                                <img
                                    src={`/images/top-${index + 1}.svg`}  // Image spécifique à chaque genre
                                    alt={genre.name}
                                    className="list-item-image"
                                />
                                <span>{genre.name} - {genre.count} musiques</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </animated.div>

        </div>
    );
}

export default BillboardPage;
