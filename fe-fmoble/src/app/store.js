import { configureStore } from "@reduxjs/toolkit";
import {
  productListReducer,
  productDetailsReducer,
} from "../reducer/productReducer";
import cartSlice, { cartReducer } from "../reducer/cartSlice";

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartSlice,
  },
});
