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

  // 🧩 Lấy danh sách semester & course duy nhất
  const semesters = [...new Set(allPayments.map(p => p.semester))];
  const courses = [...new Set(allPayments.map(p => p.courseName))];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* 🔍 Tìm kiếm */}
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>

            {/* 🏫 Lọc theo Semester */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select onChange={e => setFilterSemester(e.target.value)}>
                  <option value="">All Semesters</option>
                  {semesters.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* 📚 Lọc theo Course */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select onChange={e => setFilterCourse(e.target.value)}>
                  <option value="">All Courses</option>
                  {courses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* 🔽 Sắp xếp */}
            <Col xs={12} md={4} lg={4}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select onChange={e => setSortOption(e.target.value)}>
                  <option value="date_desc">Date descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="course_asc">Course ascending</option>
                  <option value="course_desc">Course descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
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
