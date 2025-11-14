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

          {/* Nút thêm mới */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="success"
              onClick={() => navigate('/payments/new')}
            >
              + Add Payment
            </Button>
          </div>

          {/* Bảng hiển thị thanh toán */}
          <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Dashboard Overview</Card.Header>
            <Card.Body>
              <PaymentTable />
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  };

  export default DashboardPage;
