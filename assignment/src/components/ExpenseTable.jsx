import React from "react";
import { Table, Button, Card } from "react-bootstrap";

function ExpenseTable({ expenses, onDelete }) {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  };

  const formatCurrency = (num) =>
    num.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <Card className="p-3 mt-3 shadow-sm">
      <h5>Expense Management</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.name}</td>
              <td>{formatCurrency(exp.amount)}</td>
              <td>{exp.category}</td>
              <td>{formatDate(exp.date)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(exp.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

export default ExpenseTable;
