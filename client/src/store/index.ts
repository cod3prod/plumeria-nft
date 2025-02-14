import { configureStore } from "@reduxjs/toolkit";
import trashReducer from "./slices/trash-slice";

export const store = configureStore({
  reducer: {
    trash: trashReducer,
  },
});
