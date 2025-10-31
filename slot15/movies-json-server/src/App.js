import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import MovieManager from './pages/MovieManager';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Trang đăng nhập */}
          <Route path="/" element={<LoginPage />} />

          {/* Trang quản lý phim - chỉ cho phép sau khi đăng nhập */}
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <MovieManager />
              </PrivateRoute>
            }
          />

          {/* Nếu nhập URL sai → chuyển về trang đăng nhập */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;