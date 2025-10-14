import React from "react";
import { Card, Form } from "react-bootstrap";

export default function Filter({ onSearch, onFilter, onSort }) {
  return (
    <Card className="mb-4 p-3 shadow-sm">
      <h5>🎯 Movie Filter</h5>
      <Form>
        {/* Search */}
        <Form.Group className="mb-3">
          <Form.Label>Search by Title or Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter keyword..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </Form.Group>

        {/* Year Filter */}
        <Form.Group className="mb-3">
          <Form.Label>Filter by Year</Form.Label>
          <Form.Select onChange={(e) => onFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="<=2000">Before or equal 2000</option>
            <option value="2001-2015">2001 - 2015</option>
            <option value=">2015">After 2015</option>
          </Form.Select>
        </Form.Group>

        {/* Sorting */}
        <Form.Group>
          <Form.Label>Sorting</Form.Label>
          <Form.Select onChange={(e) => onSort(e.target.value)}>
            <option value="">None</option>
            <option value="year-asc">Year ↑</option>
            <option value="year-desc">Year ↓</option>
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
            <option value="duration-asc">Duration ↑</option>
            <option value="duration-desc">Duration ↓</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Card>
  );
}
