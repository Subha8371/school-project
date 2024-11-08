// lib/features/api/apiSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosIntercepterCall from "@/services";
import { axiosIntercepterCallPost } from "@/services"; 

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Create async thunk to fetch admin details
export const getStudentDetails= createAsyncThunk(
  "api/getStudentDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIntercepterCall("/student");
      return response.data.data.list; // Assuming the details are here
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create async thunk to fetch  edit details
export const getEditDetails= createAsyncThunk(
  "api/getEditDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosIntercepterCall(`/student/edit/${id}`);
      console.log(response.data,"AAAAAAAAAAAAAAAAAAAAAAAAAAA")
      return response.data.data.user; // Assuming the details are here
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create async thunk to update details
export const updateDetails= createAsyncThunk(
  "api/updateDetails",
  async ( studentData, { rejectWithValue }) => {
    console.log("MMMMMMMMMMMMMMMMM",studentData)
    try {
      const response = await axiosIntercepterCallPost(`/student/edit/${studentData.id}`,studentData);
      console.log(response,"BBBBBBBBBBBBBBBBBBBBBBBBBB")
      // return response.data.data; // Assuming the details are here
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create async thunk to update details
export const deleteDetails= createAsyncThunk(
  "api/deleteDetails",
  async ( id, { rejectWithValue }) => {
    console.log("MMMMMMMMMMMMMMMMM",id)
    try {
      const response = await axiosIntercepterCallPost(`/student/delete/${id}`);
      // return response.data.data; // Assuming the details are here
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create async thunk to fetch admin details
export const createStudentDetails= createAsyncThunk(
    "api/createStudentDetails",
    async (studentData, { rejectWithValue }) => {
      try {
        await axiosIntercepterCallPost("/student",studentData);
        // return response.data.data.list; // Assuming the details are here
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Create slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Save fetched details to state
        
        // console.log(action.payload,"OOOOOOOOOOOOOOOOOO",items)
      })
      .addCase(getStudentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
