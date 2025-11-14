import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRouter';

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}