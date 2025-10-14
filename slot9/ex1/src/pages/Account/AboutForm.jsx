import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function AboutForm() {
  return (
    <Form>
      <Row className="mb-3">
        <Col><Form.Control placeholder="First Name" isInvalid /></Col>
        <Col><Form.Control placeholder="Last Name" /></Col>
      </Row>
      <Form.Control className="mb-3" placeholder="Email" isInvalid />
      <Form.Control className="mb-3" placeholder="Phone" />
      <Form.Control className="mb-3" placeholder="Age" type="number" />
      <Form.Control type="file" className="mb-3" />
      <Form.Control.Feedback type="invalid">
        This field is required.
      </Form.Control.Feedback>
    </Form>
  );
}
