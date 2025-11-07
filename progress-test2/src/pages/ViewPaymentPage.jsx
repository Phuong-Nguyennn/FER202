// src/pages/ViewPaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import { Card, Button, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ViewPaymentPage = () => {
  const { id } = useParams();
  const { payments, loading } = usePayments();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Nếu context chưa có dữ liệu, tự gọi API để fetch riêng payment đó
  useEffect(() => {
    const existingPayment = payments.find(p => p.id === parseInt(id));

    if (existingPayment) {
      setPayment(existingPayment);
      setIsLoading(false);
    } else {
      // Fetch riêng từ JSON Server
      axios
        .get(`http://localhost:3001/payments/${id}`)
        .then(res => {
          setPayment(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load payment:', err);
          setIsLoading(false);
        });
    }
  }, [id, payments]);

  if (isLoading || loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading payment details...
      </div>
    );
  }

  if (!payment) {
    return <p className="text-center mt-4 text-danger">Payment not found.</p>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header as="h5">Payment Details</Card.Header>
        <Card.Body>
          <p><strong>Semester:</strong> {payment.semester}</p>
          <p><strong>Course:</strong> {payment.courseName}</p>
          <p><strong>Amount:</strong> ${payment.amount.toLocaleString()}</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Back
            </Button>
            <Button
              variant="warning"
              onClick={() => navigate(`/payments/edit/${payment.id}`)}
            >
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewPaymentPage;
