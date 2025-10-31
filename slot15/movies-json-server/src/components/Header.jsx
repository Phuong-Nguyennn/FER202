import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>🎬 Movie Manager</Navbar.Brand>
        {user && (
          <div className="text-white d-flex align-items-center gap-3">
            <span>Xin chào, <strong>{user.name}</strong></span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
