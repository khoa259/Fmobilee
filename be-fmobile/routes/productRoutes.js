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

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  })
);

export default router;
