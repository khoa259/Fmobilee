import express from "express";
import {
  createBill,
  listBill,
  detailBill,
} from "../../controller/Bills.js/Bill.js";
const routerBill = express.Router();

routerBill.post("/bill", createBill);
routerBill.get("/bills", listBill);
routerBill.get("/bill/:id", detailBill);

export default routerBill;
