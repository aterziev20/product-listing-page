// favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      console.log("product added to favorites");
      // Add the product to favorites
      state.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      console.log("product removed to favorites");
      // Remove the product from favorites
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
