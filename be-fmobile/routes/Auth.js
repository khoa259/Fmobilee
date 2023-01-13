import express from "express";
// middleware

import { authCheck, adminCheck } from "../middleware/auth.js";
// import Controller
import {
  createOrUpdateUser,
  currentUser,
  updateUser,
} from "../controller/auth.js";
import { getUser } from "../controller/user.js";

const authRoute = express.Router();
authRoute.post("/create-or-update-user", authCheck, createOrUpdateUser);
authRoute.post("/current-user", authCheck, currentUser);
authRoute.put("/update-user/:id", updateUser);
// authRoute.get("/user-profile/:id", getUser);
authRoute.post("/current-admin", authCheck, adminCheck, currentUser);

export default authRoute;
