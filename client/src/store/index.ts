import { configureStore } from "@reduxjs/toolkit";
import trashReducer from "./slices/trash-slice";
import balancesReducer from "./slices/balances-slice";

export const store = configureStore({
  reducer: {
    trash: trashReducer,
    balances: balancesReducer,
  },
});
