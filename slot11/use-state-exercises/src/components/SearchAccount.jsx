import React, { useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

// Dữ liệu giả lập
const accounts = [
  {
    id: 1,
    username: 'john_doe',
    password: '123456',
    avatar: '/images/1111.jpg',
  },
  {
    id: 2,
    username: 'jane.smith',
    password: 'abc123',
    avatar: '/images/2222.jpg',
  },
  {
    id: 3,
    username: 'admin_user',
    password: 'root1234',
    avatar: '/images/3333.jpg',
  },
  {
    id: 4,
    username: 'long.nguyen',
    password: 'pass1234',
    avatar: '/images/4444.jpg',
  },
];

function SearchAccount() {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc account theo username
  const filteredAccounts = accounts.filter((acc) =>
    acc.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4 text-primary">Tìm kiếm Account theo Username</h3>

      <Form.Control
        type="text"
        placeholder="Nhập username cần tìm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Row>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((acc) => (
            <Col key={acc.id} md={3} sm={6} className="mb-4">
              <Card className="h-100 text-center shadow-sm">
                <Card.Img
                  variant="top"
                  src={acc.avatar}
                  alt={acc.username}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: '20px auto 10px',
                  }}
                />
                <Card.Body>
                  <Card.Title>{acc.username}</Card.Title>
                  <Card.Text>
                    <strong>Password:</strong> {acc.password}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">Không tìm thấy kết quả</p>
        )}
      </Row>
    </Container>
  );
}

export default SearchAccount;
