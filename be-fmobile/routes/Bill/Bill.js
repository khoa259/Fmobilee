import express from "express";
import { createBill } from "../../controller/Bills.js/Bill.js";
const routerBill = express.Router();

routerBill.post("/bill", createBill);

export default routerBill;
