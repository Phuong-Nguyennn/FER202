import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      await new Promise(r => setTimeout(r, 500)); // delay giả lập
      if (paymentData.amount <= 0) {
        return rejectWithValue('Số tiền không hợp lệ');
      }
      if (paymentData.amount > 500) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return { id: Date.now(), ...paymentData, status: 'SUCCESS' };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPayment.pending, state => {
        state.isLoading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default paymentsSlice.reducer;

export const selectSuccessfulPayments = state =>
  state.payments.list.filter(p => p.status === 'SUCCESS');
