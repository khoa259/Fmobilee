import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { cartReducer } from "./cartReducer";
import { searchReducer } from "./searchReducer";
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  search: searchReducer,
});

export default rootReducer;
