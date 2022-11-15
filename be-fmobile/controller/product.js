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

export const listAll = async (req, res) => {
  const { sort, limit, order } = req.body;
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

export const remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

export const read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

export const update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    console.log("Product Update Error ---->", error);
    return res.status(400).send("Product update failed");
  }
};
export const list = async (req, res) => {
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, limit } = req.body;
    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
