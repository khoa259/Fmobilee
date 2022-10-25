import express from "express";
// middleware

import { authCheck } from "../middleware/auth.js";
// import Controller
import { createOrUpdateUser } from "../controller/auth.js";

const myMiddleware = (req, res, next) => {
  console.log("I am a middlware");
  next();
};

const authRoute = express.Router();
authRoute.post("/create-or-update-user", authCheck, createOrUpdateUser);
// authRoute.get("/testing", myMiddleware, (req, res) => {
//   res.json({
//     data: "YOU SUCCESSFULY TRIED MIDDLEWARE",
//   });
// });

export default authRoute;
