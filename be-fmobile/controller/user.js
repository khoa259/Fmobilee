import User from "../models/User.js";
// import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Bills from "../models/Bills.js";
import mongoose from "mongoose";
import Status from "../models/Status.js";

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
      object.images = cart[0].images;
      object.price = cart[0].price;
      object.color = cart[0].color;
      products.push(object);
      // if ((object.product = cart[0]._id)) {
      //   cartByUser.cartTotal =
      //     cartByUser.cartTotal + object.price * object.count;
      // }
    }
    cartByUser.products = [...cartByUser.products, ...products];
    console.log({ ...cartByUser });
    const updated = await Cart.findOneAndUpdate(
      { _id: cartByUser._id },
      { ...cartByUser },
      { new: true }
    ).exec();

    res.json({ message: "Thành công", succces: true });
  } catch (error) {
    console.log(12, error);
    res.json({ message: "Thất bại", succces: false });
  }
};

export const getUserCart = async (req, res) => {
  const mysort = { createdAt: -1 };
  const user = await User.findOne({ email: req.user?.email })
    .sort(mysort)
    .exec();
  const cart = await Cart.findOne({ orderdBy: user?._id })
    .sort(mysort)
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  if (cart) {
    const { products, totalAfterDiscount, _id } = cart;
    res.json({ _id, products, totalAfterDiscount });
  }
};

export const emptyCart = async (req, res) => {
  const { id, idProduct } = req.params;
  console.log("id", id);
  // const cartInfo = await Cart.findOne({ _id: id });
  const remove = await Cart.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { $pull: { products: { _id: idProduct } } },
    { multi: true }
  );

  // console.log("remove", remove);
  res.json(remove);
};

export const saveAddress = async (req, res) => {
  const userAddress = await User.findOne(
    { email: req.user.email },
    { address: req.body }
  ).exec();
  res.json({ ok: true });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    res.json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const countPrdCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { idProduct, count } = req.body;

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
        $set: { "products.$[p].count": count },
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
    const userBills = await Bills.find().populate("status", "name");
    const billData = userBills.filter(
      (dataBill) => dataBill.orderdBy == req.params.id
    );
    // const queryStatus = await Status.findOne({ _id: billData.status });
    console.log("userBills", userBills);
    // console.log("billData", billData);
    // const result = { ...billData, status: queryStatus.name };
    // console.log("result", result);
    res.json(billData);
  } catch (error) {
    res.status(400).json({ message: "không thể cap nhat" });
  }
};

export const wishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).exec();
    res.json(user);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const getwishlist = async (req, res) => {
  console.log("___run__");
  try {
    const list = await User.find({ email: req.user.email })
      .sort({ createdAt: -1 })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    console.log("___list___", list);
    res.json(list);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const deletewishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findOneAndRemove(
      { email: req.user },
      { $pull: { wishlist: productId } }
    ).exec();
    res.json(user);
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};
