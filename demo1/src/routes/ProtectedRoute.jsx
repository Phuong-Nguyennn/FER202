import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isRegistered } = useContext(AuthContext);

  if (!isRegistered) {
    alert("Please register first!");
    return <Navigate to="/" replace />;
  }

  return children;
}
