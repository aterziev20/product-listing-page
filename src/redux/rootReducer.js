import { combineReducers } from "redux";

import searchReducer from "./search/searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
