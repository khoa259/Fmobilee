import { Router } from "express";
import { userCart, getUserCart } from "../controller/user.js";
import { authCheck, adminCheck } from "../middleware/auth.js";

const routerCart = Router();

routerCart.post("/user/cart", authCheck, userCart); // save cart
routerCart.get("/user/cart", authCheck, getUserCart); //get cart

export default routerCart;
