import { Router } from "express";

const routerPayment = Router();
import {
  createPaymentIntent,
  getPublishableKey,
} from "../controller/stripe.js";
// middleware
import { authCheck } from "../middleware/auth.js";
routerPayment.post("/create-payment-intents", createPaymentIntent);
routerPayment.get("/config", getPublishableKey);

export default routerPayment;
