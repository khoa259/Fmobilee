import express from "express";
import {
  createBill,
  listBill,
  detailBill,
  Editbill,
} from "../../controller/Bills.js/Bill.js";
const routerBill = express.Router();

routerBill.post("/bill", createBill);
routerBill.get("/bills", listBill);
routerBill.get("/bill/:id", detailBill);
routerBill.put("/bill/:id", Editbill);

export default routerBill;
