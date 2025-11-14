  // src/pages/DashboardPage.jsx
  import React from 'react';
  import { Container, Card, Button } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import NavigationHeader from '../components/NavigationHeader';
  import FilterBar from '../components/FilterBar';
  import PaymentTable from '../components/PaymentTable';

  const DashboardPage = () => {
    const navigate = useNavigate();

    return (
      <>
        {/* 1. Header */}
        <NavigationHeader />

        {/* 2. Nội dung chính */}
        <Container className="mt-4">
          {/* Bộ lọc */}
          <FilterBar />
          {/* Bảng hiển thị thanh toán */}
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Expense Management</Card.Header>
            <Card.Body>
              <PaymentTable />
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  };

  export default DashboardPage;
