import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

function ExpenseForm({ onAdd }) {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.name || !expense.category || expense.amount <= 0) {
      alert("Please fill all fields and enter valid amount!");
      return;
    }
    onAdd(expense);
    setExpense({ name: "", amount: "", category: "", date: "" });
  };

  return (
    <Card className="p-3 mt-3 shadow-sm">
      <h5>Add Expense</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={expense.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            name="amount"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            name="category"
            placeholder="Category"
            value={expense.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Add Expense
        </Button>
      </Form>
    </Card>
  );
}

export default ExpenseForm;
