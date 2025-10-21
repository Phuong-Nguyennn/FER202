import React, { useReducer, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Modal } from 'react-bootstrap';

// Trạng thái ban đầu
const initialState = {
  user: { username: '', password: '' },
  errors: {},
  showModal: false,
};

// Hàm reducer quản lý mọi thay đổi của state
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        user: { ...state.user, [action.field]: action.value },
        errors: {
          ...state.errors,
          ...(action.value.trim() === ''
            ? { [action.field]: `${action.field.charAt(0).toUpperCase() + action.field.slice(1)} is required` }
            : (() => {
                const { [action.field]: removed, ...rest } = state.errors;
                return rest;
              })()),
        },
      };

    case 'SET_ERRORS':
      return { ...state, errors: action.payload };

    case 'SHOW_MODAL':
      return { ...state, showModal: true };

    case 'HIDE_MODAL':
      return { ...initialState }; // Reset form về ban đầu

    default:
      return state;
  }
}

function LoginForm2() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, errors, showModal } = state;

  // Khi thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name, value });
  };

  // Khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (user.username.trim() === '') newErrors.username = 'Username is required';
    if (user.password.trim() === '') newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: newErrors });
    } else {
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  // Đóng modal
  const handleCloseModal = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Login Form 2 (useReducer)</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Enter username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal thông báo đăng nhập thành công */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-success text-center">
            Welcome, {user.username}!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginForm2;
