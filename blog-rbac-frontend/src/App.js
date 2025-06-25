// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails'; // ✅ Create this
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './index.css';
function App() {
  return (
    <Router>
      <Navbar />

      {/* <div className="flex justify-center p-6">
      <div className="text-3xl font-bold text-green-600">
          LIA PLUS AI Project by{' '}
          <span
            className="text-blue-600 underline font-extrabold animate-pulse"
            style={{ animationDuration: '2s' }}
          >
            Pawan Singh
          </span>
        </div>
      </div> */}



      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
