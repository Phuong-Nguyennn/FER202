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
          <th>Semester</th>
          <th>Course</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td>{payment.semester}</td>
            <td>{payment.courseName || 'N/A'}</td> {/* ✅ fix courseName */}
            <td>${payment.amount.toLocaleString()}</td>
            <td>
              <Button
                variant="info"
                size="sm"
                className="me-2"
                onClick={() => navigate(`/payments/${payment.id}`)} // ✅ View
              >
                View
              </Button>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => navigate(`/payments/edit/${payment.id}`)} // ✅ Edit
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
