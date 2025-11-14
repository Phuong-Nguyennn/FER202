import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Load expenses từ server
export const fetchExpenses = createAsyncThunk("expenses/fetch", async (userId) => {
  const res = await api.get("/expenses");
  return res.data.filter((e) => e.userId === userId);
});

// Thêm expense
export const addExpense = createAsyncThunk("expenses/add", async (expense) => {
  const res = await api.post("/expenses", expense);
  return res.data;
});

// Xóa expense
export const deleteExpense = createAsyncThunk("expenses/delete", async (id) => {
  await api.delete(`/expenses/${id}`);
  return id;
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    items: [],
    total: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.total = action.payload.reduce((sum, e) => sum + Number(e.amount), 0);
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += Number(action.payload.amount);
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
        state.total = state.items.reduce((sum, e) => sum + Number(e.amount), 0);
      });
  },
});

export default expenseSlice.reducer;
