// src/components/PaymentTable.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayments } from '../contexts/PaymentContext';

const PaymentTable = () => {
  const { payments, deletePayment } = usePayments();
  const navigate = useNavigate();

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td>{payment.Name}</td>
            <td>{payment.Amount || 'N/A'}</td> 
            <td>${payment.amount.toLocaleString()}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                className="me-2"
                onClick={() => navigate(`/payments/${payment.id}`)} 
              >
                View
              </Button>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => navigate(`/payments/edit/${payment.id}`)} 
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deletePayment(payment.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PaymentTable;
