import Product from "../models/product.js";
import Category from "../models/category.js";
import slugify from "slugify";
import User from "../models/User.js";

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
  console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPgae = 4;
    const products = await Product.find({})
      .skip((currentPage - 1) * perPgae)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPgae)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

export const productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};
export const listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("postedBy")
    .exec();

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const product = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("posteBy", "_id name")
    .exec();

  res.json(product);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("posteBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const product = await Product.find({ category })
      .populate("category", "_id name")
      // .populate("posteBy", "_id name")
      .exec();
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

//search products
export const searchFilters = async (req, res) => {
  const { query, price, category } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    console.log("price---->", price);
    await handlePrice(req, res, price);
  }
  if (category) {
    console.log("category---->", category);
    await handleCategory(req, res, category);
  }
};

export const showProductByCategory = async (req, res) => {
  const { cateId } = req.body.params.slug;
  const product = await Product.findById(cateId).populate("category").exec();
  // const product = await Product.findOne(category).populate("products").exec();
  res.json(product);
};
