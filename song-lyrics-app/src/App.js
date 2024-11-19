import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SongsList from './SongsList'; // Composant pour afficher les chansons

const App = () => {
  return (
    <Router>
      <nav>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '15px' }}>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/songs">Chansons</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Bienvenue sur l'application de musique</h1>} />
        <Route path="/songs" element={<SongsList />} />
      </Routes>
    </Router>
  );
};

export default App;
