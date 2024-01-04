import { createSlice } from "@reduxjs/toolkit";

const UiSlice = createSlice({
  name: "Ui",
  initialState: {
    isSideBarOpen: false,
    isDialogOpen: false,
    isSnackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
  },
  reducers: {
    toggleSideBar: (state, action) => {
      if (action.payload === false || action.payload === true) {
        state.isSideBarOpen = action.payload;
      } else {
        state.isSideBarOpen = !state.isSideBarOpen;
      }
    },
    toggleDialog: (state) => {
      state.isDialogOpen = !state.isDialogOpen;
    },
    toggleSnackbar: (state, action) => {
      state.isSnackbarOpen = !state.isSnackbarOpen;
      state.snackbarMessage = action.payload.message;
      state.snackbarSeverity = action.payload.severity;
    },
  },
});

export const { toggleSideBar, toggleDialog, toggleSnackbar } = UiSlice.actions;
export default UiSlice.reducer;
