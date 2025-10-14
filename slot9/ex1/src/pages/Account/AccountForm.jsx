import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AccountForm() {
  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Text><i className="bi bi-person"></i></InputGroup.Text>
        <Form.Control placeholder="Username" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text><i className="bi bi-lock"></i></InputGroup.Text>
        <Form.Control placeholder="Password" type="password" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text><i className="bi bi-lock-fill"></i></InputGroup.Text>
        <Form.Control placeholder="Confirm Password" type="password" />
      </InputGroup>
      <Form.Control className="mb-3" placeholder="Secret Question" />
      <Form.Control placeholder="Answer" />
    </Form>
  );
}
