// import User from "../models/user.js";
// import Cart from "../models/cart.js";
// import Product from "../models/product.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
// import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

export const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd",
  });
  // const paymentIntent = await Stripe.paymentIntents.
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
