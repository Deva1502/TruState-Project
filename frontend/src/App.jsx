import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SaleDetails from './pages/SaleDetails';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sales/:id" element={<SaleDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
