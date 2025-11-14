import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CarProvider } from './context/CarContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <div className="container mt-4">
            <AppRoutes />
          </div>
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
