import { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { MobileContext } from "../contexts/MobileContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { dispatch } = useContext(MobileContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) return alert("Username or Email is required.");
    if (!password) return alert("Password is required.");

    const res = await axios.get("http://localhost:5000/users");
    const user = res.data.find(u => (u.email === email || u.username === email) && u.password === password);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      setShowModal(true);
      setTimeout(() => navigate("/mobiles"), 1500);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <Container style={{ maxWidth: "400px" }}>
      <h3>Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email/Username</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>Welcome, {email}! Login successful.</Modal.Body>
      </Modal>
    </Container>
  );
}
