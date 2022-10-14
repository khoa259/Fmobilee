import Product from "../model/productModel.js";
// library
import asyncHandler from "express-async-handler";

// @desc Fetch all Products
// @route  GET/api/products
// @access Public

const getProducts = asyncHandler (async (req, res) => {
        const product = await Product.find({})

        res.json(products)
})

// @desc Fetch single Product
// @route  GET/api/products/:ud
// @access Public

const getProductsById = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
})

export{ getProducts, getProductsById }