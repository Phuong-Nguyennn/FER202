// src/components/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const PaymentForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || { Name: '', Amount: '', Category: '' }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.Name || !formData.Amount || !formData.Category) {
      alert('Please fill all fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card>
      <Card.Header>Add / Edit Payment</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="amount"
              value={formData.Category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PaymentForm;
