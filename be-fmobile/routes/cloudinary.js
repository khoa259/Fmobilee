import { Router } from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { upload, remove } from "../controller/cloudinary";
const router = Router();

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

export default router;
