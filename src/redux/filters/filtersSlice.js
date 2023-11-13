// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPriceRanges: [],
  selectedColors: [],
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { selectedPriceRanges, selectedColors } = action.payload;
      state.selectedPriceRanges = selectedPriceRanges;
      state.selectedColors = selectedColors;
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
