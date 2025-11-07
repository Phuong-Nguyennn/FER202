// src/pages/EditPaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';
import PaymentForm from '../components/PaymentForm';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const EditPaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payments, updatePayment, loading } = usePayments();

  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load dữ liệu: ưu tiên lấy từ context, nếu chưa có thì fetch từ API
  useEffect(() => {
    const existingPayment = payments.find(p => p.id === parseInt(id));

    if (existingPayment) {
      setPayment(existingPayment);
      setIsLoading(false);
    } else {
      axios
        .get(`http://localhost:3001/payments/${id}`)
        .then(res => {
          setPayment(res.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load payment for edit:', err);
          setIsLoading(false);
        });
    }
  }, [id, payments]);

  // ✅ Cập nhật payment
  const handleEdit = async updatedData => {
    await updatePayment(parseInt(id), updatedData);
    navigate('/home');
  };

  if (isLoading || loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> Loading payment data...
      </div>
    );
  }

  if (!payment) {
    return <p className="text-center mt-4 text-danger">Payment not found.</p>;
  }

  return (
    <Container className="mt-4">
      <h3>Edit Payment</h3>
      <PaymentForm initialData={payment} onSubmit={handleEdit} />
    </Container>
  );
};

export default EditPaymentPage;
