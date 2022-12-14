import express from "express";
import { createBill, listBill } from "../../controller/Bills.js/Bill.js";
const routerBill = express.Router();

routerBill.post("/bill", createBill);
routerBill.get("/bills", listBill);

export default routerBill;
