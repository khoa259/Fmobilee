import { Router } from "express";
import { authCheck, adminCheck } from "../middleware/auth.js";
import { upload, remove } from "../controller/cloudinary.js";
<<<<<<< HEAD

const router = Router();
=======
const routerUpload = Router();
>>>>>>> a6cedb81b1cc3474034b8120a9acea947fdb3a2c

routerUpload.post("/uploadimages", authCheck, adminCheck, upload);
routerUpload.post("/removeimage", authCheck, adminCheck, remove);

export default routerUpload;
