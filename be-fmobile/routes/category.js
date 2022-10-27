import express from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { create, read, update, remove, list } from "../controller/category";

const router = express.Router();
router.post("/category", authCheck, adminCheck, create);
router.post("/categories", list);
router.post("/category/:slug", authCheck, adminCheck, read);
router.post("/category/:slug", authCheck, adminCheck, update);
router.post("/category/:slug", authCheck, adminCheck, remove);

export default router;
