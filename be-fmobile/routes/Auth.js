import express from "express";
// import Controller
import { createOrUpdateUser } from "../controller/auth.js";

const authRoute = express.Router();

authRoute.get("/user", createOrUpdateUser);

export default authRoute;
