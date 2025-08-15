import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UploadSample from './pages/UploadSample';
import GenerateDrums from './pages/GenerateDrums';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadSample />} />
        <Route path="/generate" element={<GenerateDrums />} />
      </Routes>
    </>
  );
}

export default App;
