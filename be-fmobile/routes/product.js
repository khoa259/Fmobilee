import express from "express";
import { create } from "../controllers/product";
import { authCheck, adminCheck } from "../middlewares/auth";
const routerProducts = express.Router();

// middlewares

// controller

// routes
routerProducts.post("/product", authCheck, adminCheck, create);

export default routerProducts;
