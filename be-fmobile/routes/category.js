import express from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { create, read, update, remove, list } from "../controller/category.js";

const routerCategory = express.Router();
routerCategory.post("/category", authCheck, adminCheck, create);
routerCategory.get("/categories", list);
routerCategory.get("/category/:slug", authCheck, adminCheck, read);
routerCategory.put("/category/:slug", authCheck, adminCheck, update);
routerCategory.delete("/category/:slug", authCheck, adminCheck, remove);

export default routerCategory;
