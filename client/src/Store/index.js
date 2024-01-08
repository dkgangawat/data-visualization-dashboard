import { configureStore } from "@reduxjs/toolkit";
import UiSlice from "./slices/UiSlice";
import  dataSlice  from "./slices/DataSlice";
import DashboardSlice from "./slices/DashboardSlice";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    UiInteraction: UiSlice,
    data: dataSlice,
    dashboard: DashboardSlice,
    user: UserSlice,
  },
});

export default store;
