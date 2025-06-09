import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import JoinedReserves from './pages/JoinedReserves';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/lend" element={<div className="page-container"><h1>Lend</h1><p>Lending features coming soon</p></div>} />
            <Route path="/borrow" element={<div className="page-container"><h1>Borrow</h1><p>Borrowing features coming soon</p></div>} />
            <Route path="/reserves/joined" element={<JoinedReserves />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
