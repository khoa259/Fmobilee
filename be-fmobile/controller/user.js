import User from "../models/User.js";
// import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Bills from "../models/Bills.js";
import mongoose from "mongoose";

export const userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  try {
    const { cart } = req.body;
    const idProduct = cart[0]._id;
    let products = [];
    let checkProductDulicate = false;
    const user = await User.findOne({ email: req.user.email }).exec();
    let cartByUser = await Cart.findOne({ orderdBy: user._id }).exec();
    if (cartByUser) {
      cartByUser.products?.forEach((product) => {
        if (idProduct == product.product) {
          checkProductDulicate = true;
          product.count = product.count + 1;
          // cartByUser.cartTotal = cartByUser.cartTotal + cart[0].price;
        }
      });
    }
    if (!checkProductDulicate) {
      let object = {};
      object.product = cart[0]._id;
      object.count = cart[0].count;
      // object.images = cart[0].images;
      object.price = cart[0].price;
      products.push(object);
      if ((object.product = cart[0]._id)) {
        cartByUser.cartTotal =
          cartByUser.cartTotal + object.price * object.count;
      }
    }
    cartByUser.products = [...cartByUser.products, ...products];
    console.log({ ...cartByUser, cartTotal: 100 });
    const updated = await Cart.findOneAndUpdate(
      { _id: cartByUser._id },
      { ...cartByUser, cartTotal: 100 },
      { new: true }
    ).exec();

    res.json({ message: "Thành công", succces: true });
  } catch (error) {
    console.log(12, error);
    res.json({ message: "Thất bại", succces: false });
  }
};

export const getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user?.email }).exec();

  const cart = await Cart.findOne({ orderdBy: user?._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  if (cart) {
    const { products, cartTotal, totalAfterDiscount, _id } = cart;
    res.json({ _id, products, cartTotal, totalAfterDiscount });
  }
};

export const emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

export const saveAddress = async (req, res) => {
  const userAddress = await User.findOne(
    { email: req.user.email },
    { address: req.body }
  ).exec();
  res.json({ ok: true });
};

export const countPrdCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { idProduct, count, cartTotal } = req.body;

    const existedCart = await Cart.findById(id);

    if (!existedCart) {
      return res.status(400).json({
        message: "Card not found",
      });
    }

    const updateCard = await Cart.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
      },
      {
        $set: { "products.$[p].count": count, cartTotal: cartTotal },
      },
      {
        arrayFilters: [{ "p._id": idProduct }],
      }
    );

    if (!updateCard) {
      return res.status(400).json({
        message: "update fail",
      });
    }

    return res.status(200).json({
      message: "update success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const ordersByUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).exec();
    console.log("user", user);
    // const userOrder = await Bills.find({ orderdBy: user._id })
    //   .populate("products.product")
    //   .exec();
    // res.json(userOrder);
  } catch (error) {
    return res.status(500).json({
      message: "không lấy được dữ liệu đơn hàng",
    });
  }
};
