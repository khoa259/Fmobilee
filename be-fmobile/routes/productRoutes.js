import express from "express";
// library
import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
const router = express.Router();
import {
  getProducts,
  getProductsById,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

export default router;
