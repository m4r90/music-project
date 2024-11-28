import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './App';
import StatisticsPage from './components/StatisticsPage';
import BillboardPage from './components/BillboardPage';
import SongPage from "./components/SongPage";
import MachineLearning from "./components/MachineLearning";
import './index.css';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/billboard" element={<BillboardPage />} />
            <Route path="/song/:id" element={<SongPage />} />
            <Route path="/machineLearning" element={<MachineLearning />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
