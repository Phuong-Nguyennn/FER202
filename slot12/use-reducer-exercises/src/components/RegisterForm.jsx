import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col, Modal, Toast } from 'react-bootstrap';

// ---------------- Reducer ----------------
const initialState = {
  form: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {},
  showToast: false,
  showModal: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };

    case 'SET_ERRORS':
      return { ...state, errors: action.errors };

    case 'SHOW_TOAST':
      return { ...state, showToast: true };

    case 'HIDE_TOAST':
      return { ...state, showToast: false };

    case 'SHOW_MODAL':
      return { ...state, showModal: true };

    case 'HIDE_MODAL':
      return { ...state, showModal: false };

    case 'RESET_FORM':
      return { ...state, form: initialState.form, errors: {} };

    default:
      return state;
  }
}

function RegisterForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { form, errors, showToast, showModal } = state;


  const usernameRegex = /^[a-zA-Z0-9._]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validate = () => {
    const newErrors = {};

    if (!usernameRegex.test(form.username.trim()))
      newErrors.username =
        'Username ≥ 3 ký tự, chỉ gồm chữ, số, "_" hoặc ".", không chứa khoảng trắng.';

    if (!emailRegex.test(form.email.trim()))
      newErrors.email = 'Email không hợp lệ.';

    if (!passwordRegex.test(form.password))
      newErrors.password =
        'Password ≥ 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.';

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = 'Confirm password không khớp.';

    dispatch({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    dispatch({ type: 'CHANGE_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: 'SHOW_TOAST' });
      dispatch({ type: 'SHOW_MODAL' });
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h3 className="text-center text-success">Register Account</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Xác nhận password..."
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button variant="success" type="submit" className="flex-fill">
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                    className="flex-fill"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => dispatch({ type: 'HIDE_TOAST' })}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#28a745',
          color: 'white',
        }}
      >
        <Toast.Body>✅ Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin */}
      {/* <Modal show={showModal} onHide={() => dispatch({ type: 'HIDE_MODAL' })} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <p>
                <strong>Username:</strong> {form.username}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'HIDE_MODAL' })}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
}

export default RegisterForm;
