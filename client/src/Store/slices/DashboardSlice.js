import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
    const response = await axios(`${import.meta.env.VITE_API_URL}/data/dashboard`);
    return response.data;
});

// DashboardSlice
const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default DashboardSlice.reducer;
