import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import AddMember from './components/AddMember';
import MemberList from './components/MemberList';
import Logout from './components/Logout';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/add-member" element={
            <PrivateRoute>
              <AddMember />
            </PrivateRoute>
          } />
          <Route path="/members-list" element={
            <PrivateRoute>
              <MemberList />
            </PrivateRoute>
          } />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
