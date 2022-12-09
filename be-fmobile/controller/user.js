import User from "../models/User.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";

export const userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  try {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    // check if cart with logged in user id already exist
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

    if (cartExistByThisUser) {
      cartExistByThisUser.remove();
      console.log("removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      // get price for creating total
      let productFromDb = await Product.findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = productFromDb.price;

      products.push(object);
    }

    // console.log('products', products)

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    // console.log("cartTotal", cartTotal);

    let newCart = await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();
    console.log("new cart ----> ", newCart);
    res.json({ message: "Thành công", succces: true });
  } catch (error) {
    res.json({ message: "Thất bại", succces: false });
  }
};

export const getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user?.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user?._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  if (cart) {
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount });
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
