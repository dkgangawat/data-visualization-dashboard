import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utility/axiosClient";
import Cookies from "js-cookie";

// Async thunk function for user login
export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  try {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    token: null,
    user: null,
    loading: false,
  },
  reducers: {
    //reducer to set state if token is present in cookies
    setLoggedIn: (state) => {
      const token = Cookies.get("token");
      if (token) {
        state.loggedIn = true;
        state.token = token;
        state.user = JSON.parse(localStorage.getItem("user"));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        Cookies.set("token", action.payload.token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loggedIn = false;
        state.token = null;
        state.user = null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
