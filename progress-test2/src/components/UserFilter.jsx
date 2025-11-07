import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ searchTerm, setSearchTerm, sortOption, setSortOption }) => {
  return (
    <Form className="mb-3">
      <Row>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Tìm theo username hoặc tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="name_asc">Tên A → Z</option>
            <option value="name_desc">Tên Z → A</option>
            <option value="role">Theo quyền</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;
