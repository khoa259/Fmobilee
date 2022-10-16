import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  cartQty: 1,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        toast.error(`Xóa ${action.payload.name} khỏi giỏ hàng`, {
          position: "top-right",
        });
      }
      localStorage.setItem("cartProducts", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity < 10) {
        state.cartItems[itemIndex].quantity += 1;
      }
      localStorage.setItem("cartProducts", JSON.stringify(state.cartItems));
    },
  },
});
export const { decreaseCart, increaseCart } = cartSlice.actions;

export default cartSlice.reducer;
