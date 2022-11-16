import express from "express";
// controller
import {
  create,
  list,
  listAll,
  productsCount,
  read,
  remove,
  update,
  productStar,
} from "../controller/product.js";
// middlewares
import { authCheck, adminCheck } from "../middleware/auth.js";
const routerProducts = express.Router();

// routes
routerProducts.post("/product", authCheck, adminCheck, create);
routerProducts.get("/products/total", productsCount);
// details page
routerProducts.get("/product/:slug", read);

routerProducts.get("/products/:count", listAll);
routerProducts.delete("/product/:slug", authCheck, adminCheck, remove);
routerProducts.put("/product/:slug", authCheck, adminCheck, update);
// list all
routerProducts.post("/products", list);
// rating
routerProducts.put("/products/star/:productId", authCheck, productStar);

export default routerProducts;
