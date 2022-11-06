import Product from "../models/product.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const read = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
