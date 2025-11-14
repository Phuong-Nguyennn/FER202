import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MobileContext } from "../contexts/MobileContext";
import { Container, Card, Button } from "react-bootstrap";

export default function MobileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(MobileContext);
  const mobile = state.mobiles.find(m => m.id === parseInt(id));

  if (!mobile) return navigate("/notfound");

  return (
    <Container className="text-center">
      <Card>
        <Card.Img src={mobile.image} />
        <Card.Body>
          <Card.Title>{mobile.name}</Card.Title>
          <Card.Text>{mobile.description}</Card.Text>
          <Card.Text><b>Price: ${mobile.price}</b></Card.Text>
          <Button onClick={() => navigate("/mobiles")}>Back to List</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
