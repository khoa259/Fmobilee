import express from "express";
// controller
import { create, listAll, remove } from "../controller/product.js";
// middlewares
import { authCheck, adminCheck } from "../middleware/auth.js";
const routerProducts = express.Router();

// routes
routerProducts.post("/product", authCheck, adminCheck, create);
routerProducts.get("/products/:count", listAll);
routerProducts.delete("product/:slug", authCheck, adminCheck, remove);

export default routerProducts;
