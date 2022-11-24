import Express from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { userCart } from "../controller/user";
const router = Express.Router();

router.post("/cart", authCheck, userCart);
