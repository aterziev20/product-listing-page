// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state[existingProductIndex].quantity -= 1;
    },
    deleteFromCart: (state, action) => {
      const existingProductIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      state.splice(existingProductIndex, 1);
    },
    clearCart: (state) => {
      state.length = 0;
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
