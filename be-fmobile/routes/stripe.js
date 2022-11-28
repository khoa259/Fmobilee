import { Router } from "express";

const routerPayment = Router();
import { createPaymentIntent } from "../controller/stripe";
// middleware
import { authCheck } from "../middleware/auth";
routerPayment.post("/create-payment-intents", authCheck, createPaymentIntent);

export default routerPayment;
