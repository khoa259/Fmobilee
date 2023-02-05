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
  getallUsers,
} from "../controller/user.js";
import { adminCheck, authCheck } from "../middleware/auth.js";

const routerCart = Router();

routerCart.post("/user/cart", authCheck, userCart);
routerCart.get("/user/cart", authCheck, getUserCart);
routerCart.delete("/user/cart/:id/:idProduct", emptyCart); // empty cart
routerCart.post("/user/address", authCheck, saveAddress);
routerCart.put("/user/cart/:id", countPrdCard);
routerCart.get("/user/orders/:id", authCheck, ordersByUser);
routerCart.get("/users", authCheck, getallUsers);

// wishlist

routerCart.post("/user/wishlist", authCheck, wishlist);
routerCart.get("/user/wishlist", authCheck, getwishlist);
routerCart.delete("/user/wishlist", authCheck, deletewishlist);

export default routerCart;
