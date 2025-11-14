import { useContext } from "react";
import { MobileContext } from "../contexts/MobileContext";
import { Container, Row, Col } from "react-bootstrap";
import MobileCard from "../components/MobileCard";

export default function MobileList() {
  const { state } = useContext(MobileContext);
  return (
    <Container>
      <Row>
        {state.mobiles.map(m => (
          <Col md={4} key={m.id} className="mb-3">
            <MobileCard mobile={m} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
