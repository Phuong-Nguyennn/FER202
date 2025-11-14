import React, { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import FilterCard from "../components/FilterCard";
import { Container, Card } from "react-bootstrap";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("");

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    const userData = res.data.filter((e) => e.userId === user.id);
    setExpenses(userData);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAdd = async (newExp) => {
    const exp = { ...newExp, userId: user.id };
    await api.post("/expenses", exp);
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    loadExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const filtered = expenses.filter((e) =>
    e.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Header fullName={user.fullName} />
      <Container className="mt-4">
        <Card className="p-3 shadow-sm">
          <h5>Total Expenses: {total.toLocaleString("vi-VN")} ₫</h5>
        </Card>

        <FilterCard filter={filter} setFilter={setFilter} />
        <ExpenseForm onAdd={handleAdd} />
        <ExpenseTable expenses={filtered} onDelete={handleDelete} />
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
