import { Router } from "express";

const routerPayment = Router();
import { createPaymentIntent } from "../controller/stripe.js";
// middleware
import { authCheck } from "../middleware/auth.js";
routerPayment.post("/create-payment-intents", authCheck, createPaymentIntent);

export default routerPayment;
