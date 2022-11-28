import User from "../models/user.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
const stripe = require("stripe")(process.env.STRIPE_SECRET);
// import Stripe from "stripe";

export const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "VND",
  });
  // const paymentIntent = await Stripe.paymentIntents.
  res.send({
    clientSecret: paymentIntent.clientSecret,
  });
};
