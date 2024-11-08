// lib/features/api/apiSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntercepterCall from "@/services";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk to fetch admin details
export const getAdminDetails= createAsyncThunk(
  "api/getAdminDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIntercepterCall("/admin");
      return response.data.data.list; // Assuming the details are here
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create slice
const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Save fetched details to state
        
        // console.log(action.payload,"OOOOOOOOOOOOOOOOOO",items)
      })
      .addCase(getAdminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
