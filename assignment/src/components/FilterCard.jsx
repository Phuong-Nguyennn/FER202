import React from "react";
import { Card, Form } from "react-bootstrap";

function FilterCard({ filter, setFilter }) {
  return (
    <Card className="p-3 mt-3 shadow-sm">
      <h5>Filter by Category</h5>
      <Form.Control
        type="text"
        placeholder="Enter category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </Card>
  );
}

export default FilterCard;
