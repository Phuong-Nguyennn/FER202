import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Giả lập API: dùng timeout thay vì gọi thật
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(r => setTimeout(r, 800)); // delay giả lập
      return [
        { id: 1, name: 'Alice', isAdmin: false },
        { id: 2, name: 'Bob', isAdmin: true },
        { id: 3, name: 'Charlie', isAdmin: false },
      ];
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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleAdminStatus: (state, action) => {
      const user = state.list.find(u => u.id === action.payload);
      if (user) user.isAdmin = !user.isAdmin;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
