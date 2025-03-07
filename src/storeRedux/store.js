import { configureStore } from "@reduxjs/toolkit";
import gastosReducer from "../slicesRedux/gastosSlice";

const store = configureStore({
  reducer: {
    gastos: gastosReducer,
  },
});

export default store;
