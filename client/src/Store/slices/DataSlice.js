import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching data
export const fetchDataAsync = createAsyncThunk(
  "data/fetchData",
  async ({ limit, page }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/data`, {
        params: { limit, page },
      });
      return {data:response.data.data, totalPages:response.data.totalPages, page, limit};
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
);

// Slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    limit: 10,
    page: 1,
    totalPages: 0,
  },
  reducers: {
    // Add other reducers here for filtering, getting unique keys, etc.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        

      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Actions
export const {} = dataSlice.actions;
console.log(dataSlice);
export default dataSlice.reducer;
