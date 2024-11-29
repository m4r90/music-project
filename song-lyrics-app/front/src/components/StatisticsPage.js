import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { useSpring, animated } from '@react-spring/web';  // Importation de react-spring
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, LinearScale, CategoryScale } from 'chart.js';
import './StatisticsPage.css';
import NavBar from './NavBar.js'

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, LinearScale, CategoryScale);

function StatisticsPage() {
    const [genreData, setGenreData] = useState([]);  // Données des genres
    const [viewData, setViewData] = useState([]);  // Données des vues
    const [decadeData, setDecadeData] = useState([]); // Données des décennies
    const [activeStat, setActiveStat] = useState('genre'); // Statistique active ('genre', 'view', 'decade')

    // Chargement des données genre depuis localStorage ou API
    useEffect(() => {
        const cachedGenreData = localStorage.getItem('genreData');
        if (cachedGenreData) {
            setGenreData(JSON.parse(cachedGenreData));
        } else {
            axios.get('http://localhost:3001/api/statistics/genres').then((response) => {
                setGenreData(response.data);
                localStorage.setItem('genreData', JSON.stringify(response.data)); // Sauvegarde dans localStorage
            });
        }

        // Chargement des données des décennies depuis localStorage ou API
        const cachedDecadeData = localStorage.getItem('decadeData');
        if (cachedDecadeData) {
            setDecadeData(JSON.parse(cachedDecadeData));
        } else {
            axios.get('http://localhost:3001/api/statistics/decades').then((response) => {
                setDecadeData(response.data);
                localStorage.setItem('decadeData', JSON.stringify(response.data)); // Sauvegarde dans localStorage
            });
        }
    }, []);

    // Fonction pour charger les données par vues avec mise en cache
    const handleViewChart = () => {
        const cachedViewData = localStorage.getItem('viewData');
        if (cachedViewData) {
            setViewData(JSON.parse(cachedViewData));        } else {
            axios.get('http://localhost:3001/api/statistics/views').then((response) => {
                setViewData(response.data);
                localStorage.setItem('viewData', JSON.stringify(response.data)); // Sauvegarde dans localStorage
            });
        }
    };

    // Données pour le graphique des vues
    const viewChart = {
        labels: viewData.map(v => v.range),
        datasets: [
            {
                label: 'Nombre de musiques',
                data: viewData.map(v => v.count),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            },
        ],
    };

    // Données pour le graphique des parutions par décennie
    const decadeChart = {
        labels: decadeData.map(d => d.range),
        datasets: [
            {
                label: 'Nombre de musiques',
                data: decadeData.map(d => d.count),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#4c84e0'],
            },
        ],
    };

    // Animation pour l'affichage des statistiques avec react-spring
    const slideIn = useSpring({
        transform: activeStat === 'genre' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeStat === 'genre' ? 1 : 0,
    });

    const slideView = useSpring({
        transform: activeStat === 'view' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeStat === 'view' ? 1 : 0,
    });

    const slideDecade = useSpring({
        transform: activeStat === 'decade' ? 'translateX(0)' : 'translateX(-100%)',
        opacity: activeStat === 'decade' ? 1 : 0,
    });

    return (

        <div className="stats-container">
            <div className="nav-bar-container"> {/* Appliquer la nouvelle classe ici */}
                <NavBar/>
            </div>
            <h1>Statistiques</h1>

            {/* Barre de navigation pour switcher entre les statistiques */}
            <div className="nav-bar">
                <button className={`nav-btn ${activeStat === 'genre' ? 'active' : ''}`} onClick={() => setActiveStat('genre')}>
                    Genres
                </button>
                <button className={`nav-btn ${activeStat === 'view' ? 'active' : ''}`} onClick={() => { setActiveStat('view'); handleViewChart(); }}>
                    Vues
                </button>
                <button className={`nav-btn ${activeStat === 'decade' ? 'active' : ''}`} onClick={() => setActiveStat('decade')}>
                    Décennies
                </button>
            </div>

            {/* Graphiques avec animation */}
            <animated.div style={slideIn} className="chart-container">
                <h2>Statistiques des Genres</h2>
                <Pie
                    data={{
                        labels: genreData.map(g => g.genre),
                        datasets: [
                            {
                                data: genreData.map(g => g.count),
                                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
                            },
                        ],
                    }}
                />
            </animated.div>

            <animated.div style={slideView} className="chart-container">
                <h2>Musiques par Vues</h2>
                <Bar data={viewChart} />
            </animated.div>

            <animated.div style={slideDecade} className="chart-container">
                <h2>Parutions par Décennie</h2>
                <Pie data={decadeChart} />
            </animated.div>
        </div>
    );
}

export default StatisticsPage;
