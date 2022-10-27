import Category from "../models/category.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    res.json(await new Category({ name, slug: slugify(name) }).save());
    console.log("123 create");
  } catch (error) {
    console.log(err);
    res.status(400).send("create category failed");
  }
};
export const list = (req, res) => {};
export const read = (req, res) => {};
export const update = (req, res) => {};
export const remove = (req, res) => {};
