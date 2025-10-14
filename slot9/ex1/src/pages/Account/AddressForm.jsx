import React from "react";
import { Form, Button } from "react-bootstrap";

export default function AddressForm() {
  return (
    <Form>
      <Form.Control className="mb-3" placeholder="Street" />
      <Form.Control className="mb-3" placeholder="City" />
      <Form.Select className="mb-3">
        <option>Country</option>
        <option>USA</option>
        <option>UK</option>
        <option>Vietnam</option>
      </Form.Select>
      <Form.Control className="mb-3" placeholder="Zip Code" />
    </Form>
  );
}
