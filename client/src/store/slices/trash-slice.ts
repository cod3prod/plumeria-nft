import { createSlice } from "@reduxjs/toolkit";

type TrashState = {
  trash: {
    tokenId: number;
    amount: number;
  }[];
};

const initialState: TrashState = {
  trash: [],
};

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
    addTrash: (state, action) => {
      state.trash.push(action.payload);
    },
    updateTrash: (state, action) => {
      const index = state.trash.findIndex(
        (item) => item.tokenId === action.payload.tokenId
      );

      if (index !== -1) {
        state.trash[index].amount += action.payload.amount;
      }
    },
    deleteTrash: (state, action) => {
      const index = state.trash.findIndex(
        (item) => item.tokenId === action.payload.tokenId
      );
      if (index !== -1) {
        state.trash.splice(index, 1);
      }
    },
  },
});

export const { addTrash, updateTrash, deleteTrash } = trashSlice.actions;
export default trashSlice.reducer;