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
      return {
        data: response.data.data,
        totalPages: response.data.totalPages,
        page,
        limit,
      };
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
);

export const fetchFilteredDataAsync = createAsyncThunk(
  "data/fetchFilteredData",
  async (filters) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/data/filter`,
        {
          params: filters,
        }
      );
      return {data:response.data, filters};
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
);

export const fetchUniqueValuesAsync = createAsyncThunk(
  "data/fetchUniqueValues",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/data/unique`
      );
      return response.data;
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
    filters: {},
    uniqueValuesForFilters: {},
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilterKey: (state, action) => {
      delete state.filters[action.payload];
    }
    
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
      })
      .addCase(fetchFilteredDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredDataAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload) 
        state.items = action.payload.data;
        state.filters = action.payload.filters;
      })
      .addCase(fetchFilteredDataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUniqueValuesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUniqueValuesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.uniqueValuesForFilters = action.payload;
      })
      .addCase(fetchUniqueValuesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Actions
export const {setFilters} = dataSlice.actions;

export default dataSlice.reducer;
