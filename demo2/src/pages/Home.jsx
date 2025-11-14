import CarouselHome from "../components/CarouselHome";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container className="text-center">
      <CarouselHome />
      <h2 className="mt-3">Welcome to Mobile Shop</h2>
      <Button variant="primary" onClick={() => navigate("/mobiles")}>
        Browse Mobile Shop
      </Button>
    </Container>
  );
}
