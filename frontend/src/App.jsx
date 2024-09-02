import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Profile from './components/Profile';
import GalleryMenu from './components/GalleryMenu';
import Gallery from './components/Gallery';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/account" element={<Account />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/menu/gallery" element={<Gallery />} />
        <Route path="/dashboard/menu" element={<GalleryMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
