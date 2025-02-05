import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Signin from './Auth/Signin.jsx';
import Signup from './Auth/Signup.jsx';
import { useAuth } from "./contexts/AuthContext.jsx";
import StudentDashboard from './pages/StudentDashboard.jsx'; 
import AdminDashboard from './pages/AdminDashboard.jsx';

const App = () => {

  const { isAuthenticated, userData } = useAuth();

  return <Router>
    <Routes>
      {/* Signup route */}
      <Route
        path='/'
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* Signin route */}
      <Route
        path='/signin'
        element={!isAuthenticated ? <Signin /> : <Navigate to="/dashboard" />}
      />

      <Route
        path='/signup'
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* Dashboard route with role-based redirection */}
      <Route
        path='/dashboard'
        element={
          isAuthenticated ? (
            userData.role === 'admin' ? (
              <Navigate to="/admin-dashboard" /> // Admin dashboard
            ) : (
              <StudentDashboard /> // Student dashboard
            )
          ) : (
            <Navigate to="/signin" /> // Redirect to sign-in if not authenticated
          )
        }
      />

      {/* Admin Dashboard Route */}
      <Route
        path='/admin-dashboard'
        element={
          isAuthenticated && userData.role === 'admin' ? (
            <AdminDashboard /> // Admin dashboard page
          ) : (
            <Navigate to="/signin" /> // Redirect to sign-in if not authenticated or not admin
          )
        }
      />
    </Routes>
  </Router>
};

export default App;
