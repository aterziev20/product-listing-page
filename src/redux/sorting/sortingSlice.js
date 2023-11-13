// sortingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortOption: "priceAsc",
};

export const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setSortOption } = sortingSlice.actions;

// Additional actions for different sorting options
export const sortLowHigh = () => ({ type: "sorting/sortLowHigh" });
export const sortHighLow = () => ({ type: "sorting/sortHighLow" });
export const sortAZ = () => ({ type: "sorting/sortAZ" });
export const sortZA = () => ({ type: "sorting/sortZA" });

export const selectSorting = (state) => state.sorting;

export default sortingSlice.reducer;
