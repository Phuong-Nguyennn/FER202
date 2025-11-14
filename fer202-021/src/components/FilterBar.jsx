// src/components/FilterBar.jsx
import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const FilterBar = () => {
  const {
    setSearchTerm,
    setFilterSemester,
    setFilterCourse,
    setSortOption,
    allPayments,
  } = usePayments();

  const semesters = [...new Set(allPayments.map(p => p.Name))];
  const courses = [...new Set(allPayments.map(p => p.courseName))];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Filter</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Catogory</Form.Label>
                <Form.Select onChange={e => setFilterSemester(e.target.value)}>
                  <option value="">All Catogory</option>
                  {semesters.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;
