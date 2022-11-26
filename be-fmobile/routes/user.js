import { Router } from "express";
import { userCart, getUserCart, emptyCart } from "../controller/user.js";
import { authCheck, adminCheck } from "../middleware/auth.js";

const routerCart = Router();

routerCart.post("/user/cart", authCheck, userCart);
routerCart.get("/user/cart", authCheck, getUserCart);
routerCart.delete("/user/cart", authCheck, emptyCart);
export default routerCart;
