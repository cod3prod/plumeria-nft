import { createSlice } from "@reduxjs/toolkit";

type BalancesState = {
  balances: number[];
};

const initialState: BalancesState = {
  balances: [],
};

const balancesSlice = createSlice({
  name: "balances",
  initialState,
  reducers: {
    setBalances: (state, action) => {
      state.balances = action.payload;
    },
  },
});

export const { setBalances } = balancesSlice.actions;
export default balancesSlice.reducer;
