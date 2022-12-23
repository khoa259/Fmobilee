import { Router } from "express";
import {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  countPrdCard,
  ordersByUser,
} from "../controller/user.js";
import { authCheck, adminCheck } from "../middleware/auth.js";

const routerCart = Router();

routerCart.post("/user/cart", authCheck, userCart);
routerCart.get("/user/cart", authCheck, getUserCart);
routerCart.delete("/user/cart", authCheck, emptyCart); // empty cart
routerCart.post("/user/address", authCheck, saveAddress);
routerCart.put("/user/cart/:id", countPrdCard);
// routerCart.get("/user/orders", ordersByUser);
export default routerCart;
