// src/contexts/PaymentContext.jsx
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axios from 'axios';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 States cho tìm kiếm, lọc, sắp xếp
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [sortOption, setSortOption] = useState('date_desc');

  // 🧠 Load dữ liệu ban đầu
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3001/expenses')
      .then(res => setPayments(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // 🛠️ CRUD cơ bản
  const addPayment = async newPayment => {
    const res = await axios.post('http://localhost:3001/expenses', newPayment);
    setPayments([...payments, res.data]);
  };

  const updatePayment = async (id, updatedPayment) => {
    const res = await axios.put(`http://localhost:3001/expenses/${id}`, updatedPayment);
    setPayments(payments.map(p => (p.id === id ? res.data : p)));
  };

  const deletePayment = async id => {
    await axios.delete(`http://localhost:3001/expenses/${id}`);
    setPayments(payments.filter(p => p.id !== id));
  };

  // 🔎 Lọc + tìm kiếm + sắp xếp
  const filteredPayments = useMemo(() => {
    let result = [...payments];

    if (searchTerm.trim() !== '') {
      result = result.filter(p =>
        `${p.Name} ${p.Amount}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSemester) {
      result = result.filter(p => p.semester === filterSemester);
    }

    if (filterCourse) {
      result = result.filter(p => p.courseName === filterCourse);
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case 'course_asc':
          return a.courseName.localeCompare(b.courseName);
        case 'course_desc':
          return b.courseName.localeCompare(a.courseName);
        case 'amount_asc':
          return a.amount - b.amount;
        case 'amount_desc':
          return b.amount - a.amount;
        case 'date_asc':
          return new Date(a.date) - new Date(b.date);
        case 'date_desc':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [payments, searchTerm, filterSemester, filterCourse, sortOption]);

  return (
    <PaymentContext.Provider
      value={{
        payments: filteredPayments,
        allPayments: payments,
        addPayment,
        updatePayment,
        deletePayment,
        setSearchTerm,
        setFilterSemester,
        setFilterCourse,
        setSortOption,
        loading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayments = () => useContext(PaymentContext);
