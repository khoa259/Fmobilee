import express from "express";
import {
  createStatus,
  getStatus,
  listStatus,
} from "../../controller/status/statusCotrollers.js";

const routerStatus = express.Router();

routerStatus.post("/status", createStatus);
routerStatus.get("/status/:id", getStatus);
routerStatus.get("/status", listStatus);

export default routerStatus;
