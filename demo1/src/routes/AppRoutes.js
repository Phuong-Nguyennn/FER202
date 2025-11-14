import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import CarManagementPage from '../pages/CarManagementPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Car Management</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Register</Link>
            <Link className="nav-link" to="/cars">Cars</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <CarManagementPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
