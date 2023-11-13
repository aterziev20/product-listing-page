// redux/rootReducer.js

import { combineReducers } from "redux";

import searchReducer from "./search/searchSlice";
import filtersReducer from "./filters/filtersSlice";
import sortingReducer from "./sorting/sortingSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  filters: filtersReducer,
  sorting: sortingReducer,
});

export default rootReducer;
