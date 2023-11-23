// redux/rootReducer.js

import { combineReducers } from "redux";

import searchReducer from "./search/searchSlice";
import filtersReducer from "./filters/filtersSlice";
import sortingReducer from "./sorting/sortingSlice";
import cartReducer from './cart/cartSlice';
import favoritesReducer from './favorites/favoritesSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  filters: filtersReducer,
  sorting: sortingReducer,
  cart: cartReducer,
  favorites: favoritesReducer 
});

export default rootReducer;

