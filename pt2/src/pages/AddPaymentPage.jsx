// src/pages/AddPaymentPage.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import PaymentForm from '../components/PaymentForm';
import { usePayments } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';

const AddPaymentPage = () => {
  const { addPayment } = usePayments();
  const navigate = useNavigate();

  const handleAdd = async payment => {
    await addPayment(payment);
    navigate('/home');
  };

  return (
    <Container className="mt-4">
      <h3>Add New Payment</h3>
      <PaymentForm onSubmit={handleAdd} />
    </Container>
  );
};

export default AddPaymentPage;
