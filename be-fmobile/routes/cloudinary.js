import { Router } from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { upload, remove } from "../controller/cloudinary.js";
const routerUpload = Router();

routerUpload.post("/uploadimages", authCheck, adminCheck, upload);
routerUpload.post("/removeimage", authCheck, adminCheck, remove);

export default routerUpload;
