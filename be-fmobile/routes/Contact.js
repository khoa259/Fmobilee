import { Router } from "express";
import { addContact } from "../controller/Contact.js";
const router = Router();

router.post("/contact", addContact);

export default router;
