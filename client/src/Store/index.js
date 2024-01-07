import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";
import  dataSlice  from "./slices/DataSlice";
import DashboardSlice from "./slices/DashboardSlice";

const store = configureStore({
  reducer: {
    UiInteraction: UiSlice,
    data: dataSlice,
    dashboard: DashboardSlice,
  },
});

export default store;
