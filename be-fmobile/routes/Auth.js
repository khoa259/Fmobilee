import express from "express";

const authRoute = express.Router();

authRoute.get("/user", (req, res) => {
  res.status(200).json({
    data: "hey you hit user API endpoint",
  });
});

export default authRoute;
