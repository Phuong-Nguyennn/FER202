import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useContext } from "react";
import { MobileContext } from "../contexts/MobileContext";
import { useNavigate } from "react-router-dom";

export default function MobileCard({ mobile }) {
  const { dispatch } = useContext(MobileContext);
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Img variant="top" src={mobile.image} />
      <Card.Body>
        <Card.Title>{mobile.name}</Card.Title>
        <Card.Text>{mobile.description}</Card.Text>
        <Card.Text><strong>${mobile.price}</strong></Card.Text>
        <Button variant="info" onClick={() => navigate(`/mobiles/${mobile.id}`)}>View Details</Button>{' '}
        <Button variant="success" onClick={() => dispatch({ type: "ADD_CART", payload: mobile })}>Add to Cart</Button>{' '}
        <Button variant="danger" onClick={() => dispatch({ type: "ADD_FAV", payload: mobile })}>Favourite</Button>
      </Card.Body>
    </Card>
  );
}

MobileCard.propTypes = { mobile: PropTypes.object.isRequired };
