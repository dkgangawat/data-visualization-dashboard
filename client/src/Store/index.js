import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";
import  dataSlice  from "./slices/DataSlice";

const store = configureStore({
  reducer: {
    UiInteraction: UiSlice,
    data: dataSlice,
  },
});

export default store;
