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
export const getPublishableKey = async (req, res) => {
  res.send({
    publishableKey:
      "pk_test_51M8vsBLbsM2NOLnX5o29mvhlmkXRfJSxqGAY2n6EyfKcDdFFlNsMgp2CmRqIQlwY8ZdGpRdvdV5FFJh5cW1JTgjy00W5uT1dzA",
  });
};
export const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
};
