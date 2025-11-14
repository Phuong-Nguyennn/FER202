import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Button,
  Spinner,
  Table,
  Alert,
  Form,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { fetchUsers, toggleAdminStatus } from './features/users/usersSlice';
import {
  createPayment,
  selectSuccessfulPayments,
} from './features/payments/paymentsSlice';

function App() {
  const dispatch = useDispatch();
  const { list: users, isLoading: usersLoading, error: usersError } = useSelector(
    state => state.users
  );
  const payments = useSelector(selectSuccessfulPayments);
  const paymentState = useSelector(state => state.payments);
  const [amount, setAmount] = useState('');

  const handleCreatePayment = () => {
    dispatch(createPayment({ amount: Number(amount) }));
    setAmount('');
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 text-primary fw-bold">
        Lab 6 – Redux Toolkit + React-Bootstrap
      </h1>

      {/* USERS SECTION */}
      <Card className="shadow-sm mb-4">
        <Card.Header as="h5" className="bg-info text-white">
          👤 User Management
        </Card.Header>
        <Card.Body>
          <Button
            variant="primary"
            onClick={() => dispatch(fetchUsers())}
            disabled={usersLoading}
          >
            {usersLoading ? <Spinner size="sm" /> : 'Fetch Users'}
          </Button>

          {usersError && <Alert variant="danger" className="mt-3">{usersError}</Alert>}

          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>
                    <span
                      className={
                        u.isAdmin ? 'text-success fw-bold' : 'text-secondary'
                      }
                    >
                      {u.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => dispatch(toggleAdminStatus(u.id))}
                    >
                      Toggle Admin
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* PAYMENTS SECTION */}
      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-success text-white">
          💳 Payments Management
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền..."
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={handleCreatePayment}
                disabled={paymentState.isLoading}
              >
                {paymentState.isLoading ? (
                  <>
                    <Spinner size="sm" /> Đang xử lý...
                  </>
                ) : (
                  'Tạo Thanh Toán'
                )}
              </Button>
            </Col>
          </Row>

          {paymentState.error && (
            <Alert variant="danger" className="mt-3">
              {paymentState.error}
            </Alert>
          )}

          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Trạng Thái</th>
                <th>Số Tiền</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td className="text-success fw-bold">{p.status}</td>
                  <td>${p.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default App;
