import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">MobileShop</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/favourite"></Nav.Link>
          <Nav.Link as={Link} to="/cart"></Nav.Link>
          <Nav.Link as={Link} to="/login"></Nav.Link>
          <Nav.Link as={Link} to="/register"></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
