import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // lưu lỗi riêng cho từng input
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Vui lòng nhập tên đăng nhập';
    if (!password.trim()) newErrors.password = 'Vui lòng nhập mật khẩu';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await login(username, password);
    if (success) {
      navigate('/movies');
    } else {
      setErrors({ general: 'Sai tên đăng nhập hoặc mật khẩu' });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Đăng nhập hệ thống</h2>

      {/* Lỗi chung */}
      {errors.general && (
        <div className="alert alert-danger py-2 text-center">{errors.general}</div>
      )}

      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
          />
          {errors.username && (
            <div className="text-danger mt-1 small">{errors.username}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <div className="text-danger mt-1 small">{errors.password}</div>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
  