import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";

const store = configureStore({
  reducer: {
    UiInteraction: UiSlice,
  },
});

export default store;
