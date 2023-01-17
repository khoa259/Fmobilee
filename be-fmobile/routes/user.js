import { Router } from "express";
import {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  countPrdCard,
  ordersByUser,
  wishlist,
  getwishlist,
  deletewishlist,
} from "../controller/user.js";
import { authCheck } from "../middleware/auth.js";

const routerCart = Router();

routerCart.post("/user/cart", authCheck, userCart);
routerCart.get("/user/cart", authCheck, getUserCart);
routerCart.delete("/user/cart", authCheck, emptyCart); // empty cart
routerCart.post("/user/address", authCheck, saveAddress);
routerCart.put("/user/cart/:id", countPrdCard);
routerCart.get("/user/orders/:id", authCheck, ordersByUser);

// wishlist

routerCart.post("/user/wishlist", authCheck, wishlist);
routerCart.get("/user/wishlist", authCheck, getwishlist);
routerCart.delete("/user/wishlist", authCheck, deletewishlist);

export default routerCart;
