import React from 'react';
import Register from './components/register.js';
import Login from './components/Login.js';
import Home from './components/Home.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







