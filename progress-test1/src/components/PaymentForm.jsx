// src/components/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const PaymentForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || { semester: '', courseName: '', amount: '' }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.semester || !formData.courseName || !formData.amount) {
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
            <Form.Label>Semester</Form.Label>
            <Form.Control
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>courseName</Form.Label>
            <Form.Control
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
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
