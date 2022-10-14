import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "../reducer/productReducer";

export const store = configureStore({
  reducer: {
    product: productListReducer,
  },
});
